import { createSlice } from "@reduxjs/toolkit";

const modalSignInSlice = createSlice({
  name: "signinmodal",
  initialState: { isOpen: false },
  reducers: {
    opensigninmodal: (state) => {
      state.isOpen = true;
    },
    closesigninmodal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { opensigninmodal, closesigninmodal } = modalSignInSlice.actions;
export default modalSignInSlice.reducer;
