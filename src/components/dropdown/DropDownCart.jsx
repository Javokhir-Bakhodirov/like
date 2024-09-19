import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Dropdown, Space } from "antd";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

const DropDownCart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart.products);
    const [localProducts, setLocalProducts] = useState(products);

    useEffect(() => {
        setLocalProducts(products);
    }, [products]);

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const handleRemoveFromCart = (product, e) => {
        e.stopPropagation();
        dispatch(removeFromCart(product));
    };

    const renderDropdownContent = () => (
        <div className="bg-white shadow-lg rounded-lg p-4 w-72">
            {localProducts.length > 0 ? (
                localProducts.map(product => (
                    <div
                        key={product._id}
                        className="flex items-center space-x-2 p-2 border-b border-gray-200">
                        <img
                            className="w-16 h-16 object-cover"
                            src={product.product_images[0]}
                            alt={product.product}
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                {product.product_name}
                            </p>
                            <p className="text-sm text-gray-600">
                                $
                                {(
                                    product.original_price * product.quantity
                                ).toFixed(2)}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                                <button
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs"
                                    onClick={e =>
                                        handleRemoveFromCart(product, e)
                                    }>
                                    -
                                </button>
                                <p className="text-xs">{product.quantity}</p>
                                <button
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs"
                                    onClick={e => handleAddToCart(product, e)}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-sm">No products in the cart</p>
            )}
        </div>
    );

    return (
        <Dropdown overlay={renderDropdownContent} trigger={["hover"]}>
            <div>
                <Space>
                    <Link to="/cart">
                        <div className="relative">
                            <AiOutlineShoppingCart className="text-2xl dark:text-white text-gray-800" />
                            {products.length > 0 && (
                                <span className="absolute top-[-13px] right-[-13px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {products.length}
                                </span>
                            )}
                        </div>
                    </Link>
                </Space>
            </div>
        </Dropdown>
    );
};

export default DropDownCart;
