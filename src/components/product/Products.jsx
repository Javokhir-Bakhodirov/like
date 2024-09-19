import { useGetProductsQuery } from "../../redux/api/productsApi";
import { Container } from "../../utils";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const Products = () => {
    const { data } = useGetProductsQuery();
    return (
        <div className="my-10">
            <Container>
                <h1 className="text-3xl font-bold mb-10">Products</h1>
                <div className="grid grid-cols-4 gap-4">
                    {data &&
                        data.payload &&
                        data.payload.map(product => (
                            <Card key={product._id} product={product} />
                        ))}
                </div>
            </Container>
        </div>
    );
};

export default Products;
