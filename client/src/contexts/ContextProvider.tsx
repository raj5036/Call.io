import type React from "react"
import AuthContextProvider from "./AuthContext/AuthContextProvider"

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthContextProvider>
			{children}
		</AuthContextProvider>
	)
}

export default ContextProvider