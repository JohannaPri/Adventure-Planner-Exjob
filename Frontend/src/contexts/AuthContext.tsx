import { createContext } from "react";
import { User } from "firebase/auth";

export interface AuthContextType {
    user: User | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);