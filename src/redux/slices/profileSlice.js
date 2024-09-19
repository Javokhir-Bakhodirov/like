import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        profile: (state, action) => {
            state.user = action.payload;
            console.log(state.user);
            localStorage.setItem("user", JSON.stringify(state.user));
        },
    },
});

export const { profile } = userSlice.actions;
export default userSlice.reducer;
