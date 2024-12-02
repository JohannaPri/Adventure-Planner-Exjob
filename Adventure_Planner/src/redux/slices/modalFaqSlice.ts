import { createSlice } from "@reduxjs/toolkit";

const modalFaqSlice = createSlice({
  name: "faqmodal",
  initialState: { isOpen: false },
  reducers: {
    openfaqmodal: (state) => {
      state.isOpen = true;
    },
    closefaqmodal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openfaqmodal, closefaqmodal } = modalFaqSlice.actions;
export default modalFaqSlice.reducer;
