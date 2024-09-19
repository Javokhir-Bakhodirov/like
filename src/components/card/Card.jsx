import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiCartAdd } from "react-icons/bi";
import { Button, Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
    useLikeProductMutation,
    useUnLikeProductMutation,
} from "../../redux/api/productsApi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Card = ({ product }) => {
    const [likeProductQ, { isError, isSuccess, isLoading }] =
        useLikeProductMutation();
    const [
        unLikeProductQ,
        { isError: isError2, isSuccess: isSuccess2, isLoading: isLoading2 },
    ] = useUnLikeProductMutation();

    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.user?.user);

    useEffect(() => {
        if (user && product.likedby.includes(user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, product.likedby]);

    const handleAddToCart = product => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const handleLikeProduct = async () => {
        if (!liked) {
            try {
                await likeProductQ(product._id);
                if (isError) {
                    console.error("Error liking product:", err);
                } else if (isSuccess) {
                    console.log("liked");
                    setLiked(true);
                }
            } catch (err) {
                console.error("Failed to like the product", err);
            }
        } else {
            await unLikeProductQ(product._id);
            if (isError2) {
                console.error("Error unliking product:", err);
            } else if (isSuccess2) {
                console.log("unliked");
                setLiked(false);
            }
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="img-wrapper">
                <Carousel arrows infinite autoplay>
                    {product.product_images &&
                        product.product_images.map(image => (
                            <Link key={image} to={`/products/${product._id}`}>
                                <img alt="example" key={image} src={image} />
                            </Link>
                        ))}
                </Carousel>
            </div>
            <div className="p-4 flex justify-between items-end">
                <div className="space-y-auto">
                    <h3 className="text-lg text-zinc-800 font-semibold mb-4 line-clamp-1">
                        {product.product_name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-6">
                        {product.description}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mb-4">
                        ${product.original_price}
                    </p>
                </div>
            </div>
            <div className="p-4 flex justify-between items-center">
                <Button type="primary" onClick={() => handleAddToCart(product)}>
                    <BiCartAdd className="text-2xl" />
                </Button>
                <div className="like-wrapper flex items-center space-x-4">
                    <button
                        onClick={handleLikeProduct}
                        disabled={isLoading || isLoading2}>
                        <AiFillLike
                            className={`text-2xl ${
                                liked ? "text-green-600" : "text-zinc-500"
                            } `}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
