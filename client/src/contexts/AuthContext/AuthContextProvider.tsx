import type React from "react"
import { useCallback, useMemo, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../../utils/Constants";
import type { User } from "../../utils/Types";
import { AuthContext, type AuthState } from "./AuthContext";
import { CommonUtils } from "../../utils/CommonUtils";


const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(() => CommonUtils.getItemFromLocalStorage(LOCAL_STORAGE_KEYS.USER_TOKEN));
	const [user, setUser] = useState<User | null>(null);

	const setAuth = useCallback((next: AuthState) => {
		setToken(next.token);
		setUser(next.user ?? null);

		if (next.token) {
			CommonUtils.setItemInLocalStorage(LOCAL_STORAGE_KEYS.USER_TOKEN, next.token);
		} else {
			CommonUtils.getItemFromLocalStorage(LOCAL_STORAGE_KEYS.USER_TOKEN);
		} 
	}, []);

	const logout = useCallback(() => setAuth({ token: null, user: null }), [setAuth]);
	const value = useMemo(() => ({ token, user, setAuth, logout }), [token, user, setAuth, logout]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider