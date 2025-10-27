import axios from 'axios';
import { CommonUtils } from '../utils/CommonUtils';
import { LOCAL_STORAGE_KEYS } from '../utils/Constants';

const AxiosInterceptor = () => {
	const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_API_BASE_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	axiosInstance.interceptors.request.use(
		config => {
			const token = CommonUtils.getItemFromLocalStorage(LOCAL_STORAGE_KEYS.USER_TOKEN)
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		error => {
			return Promise.reject(error)
		}
	);

	return axiosInstance;
};

export default AxiosInterceptor;
