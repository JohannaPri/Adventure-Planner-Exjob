import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
    user: User | null;
    loading: boolean;
    isLoggedIn: boolean;
    username?: string | null;
    email?: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    isLoggedIn: false,
    username: null,
    email: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
            state.isLoggedIn = action.payload !== null;
            state.username = action.payload?.displayName || null;
            state.email = action.payload?.email || null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        signOutUser(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.username = null;
            state.email = null;
        },
    },
});

export const { setUser, setLoading, signOutUser } = authSlice.actions;
export default authSlice.reducer;