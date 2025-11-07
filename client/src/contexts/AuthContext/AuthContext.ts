import { createContext, useContext } from "react";
import type { User } from "../../utils/Types";

export type AuthState = {
	token: string | null;
	user: User | null;
};


type AuthContextValue = AuthState & {
	setAuth: (next: AuthState) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	
	if (!ctx) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return ctx;
}