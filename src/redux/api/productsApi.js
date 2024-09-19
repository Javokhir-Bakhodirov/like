import { api } from "./index";

const productsApi = api.injectEndpoints({
    endpoints: build => ({
        getProducts: build.query({
            query: () => ({
                url: "/product/all",
            }),
            providesTags: ["Products"],
        }),
        getProductDetails: build.query({
            query: id => ({
                url: `/product/single-product/${id}`,
            }),
        }),
        searchProduct: build.mutation({
            query: searchQuery => ({
                url: `/product/search?productName=${searchQuery}`,
                method: "POST",
            }),
        }),
        likeProduct: build.mutation({
            query: id => ({
                url: `/product/${id}/like`,
                method: "PATCH",
            }),
            invalidatesTags: ["Products"],
        }),
        unLikeProduct: build.mutation({
            query: id => ({
                url: `/product/${id}/unlike`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useSearchProductMutation,
    useLikeProductMutation,
    useUnLikeProductMutation,
} = productsApi;
