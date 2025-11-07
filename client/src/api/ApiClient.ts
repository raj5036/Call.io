import AxiosInterceptor from "./AxiosInterceptor";

const axiosInstance = AxiosInterceptor();

const SERVER_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const ApiClient = {
	Room: {
		joinRoom: (room: string) => {
			return Promise.resolve(
				axiosInstance.post(`${SERVER_BASE_URL}/token`, { room })
			)
				.then(res => res.data)
				.catch(err => {
					throw new Error(err);
				})
		}
	},
	Auth: {
		login: (payload: { email: string, password: string }) => {
			return Promise.resolve(
				axiosInstance.post(`${SERVER_BASE_URL}/auth/login`, payload)
			)
				.then(res => res.data)
				.catch(err => {
					throw new Error(err);
				})
		},
		signup: (payload: { name: string, email: string, password: string }) => {
			return Promise.resolve(
				axiosInstance.post(`${SERVER_BASE_URL}/auth/signup`, payload)
			)
				.then(res => res.data)
				.catch(err => {
					throw new Error(err);
				})
		},
	},
}