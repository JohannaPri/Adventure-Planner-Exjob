import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  showToast: boolean;
}

const initialState: ToastState = {
  message: "",
  type: "info",
  showToast: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>
    ) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.showToast = true;
    },
    hideToast(state) {
      state.showToast = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
