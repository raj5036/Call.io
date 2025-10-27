export const CommonUtils = {
	setItemInLocalStorage: (key: string, value: unknown) => {
		localStorage.setItem(key, JSON.stringify(value))
	},
	getItemFromLocalStorage: (key: string) => {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value): null;
	},
	removeItemFromLocalStorage: (key: string) => {
		localStorage.removeItem(key)
	},
};