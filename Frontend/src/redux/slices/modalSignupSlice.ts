import { createSlice } from "@reduxjs/toolkit";

const modalSignUpSlice = createSlice({
    name: 'signupmodal',
    initialState: { isOpen: false },
    reducers: {
        opensignupmodal: (state) => { state.isOpen = true; },
        closesignupmodal: (state) => { state.isOpen = false },
    },
});

export const { opensignupmodal, closesignupmodal } = modalSignUpSlice.actions;
export default modalSignUpSlice.reducer;