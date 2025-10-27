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
	}
}