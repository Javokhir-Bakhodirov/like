import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import userReducer from "../slices/profileSlice";
import { api } from "../api";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        user: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
});
