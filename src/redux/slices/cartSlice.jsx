import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { products: [] };
};

const initialState = loadCartFromLocalStorage();

const saveCartToLocalStorage = cart => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.products.findIndex(
                product => product._id === action.payload._id
            );
            console.log(index);
            if (index === -1) {
                state.products.push({ ...action.payload, quantity: 1 });
                notification.success({
                    message: "Added to Cart",
                    description: `${state.products[index]?.product_name} has been added to your cart.`,
                    placement: "bottomRight",
                });
            } else {
                if (state.products[index].quantity) {
                    state.products[index].quantity =
                        state.products[index].quantity + 1;
                    notification.success({
                        message: "Added to Cart",
                        description: `${state.products[index]?.product_name} has been added to your cart.`,
                        placement: "bottomRight",
                        duration: 1,
                    });
                } else {
                    notification.error({
                        message: "Added to Cart",
                        description: `${state.products[index]?.product_name} is out of stock.`,
                        placement: "bottomRight",
                        duration: 1,
                    });
                }
            }
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const index = state.products.findIndex(
                product => product._id === action.payload._id
            );
            if (state.products[index].quantity > 1) {
                state.products[index].quantity =
                    state.products[index].quantity - 1;
            } else {
                state.products = state.products.filter(
                    product => product._id !== action.payload._id
                );
            }
            saveCartToLocalStorage(state);
        },

        clearCart: state => {
            state.products = [];
            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
