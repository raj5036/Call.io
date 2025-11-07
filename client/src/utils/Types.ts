export type User = {
	name: string
	email: string
	password: string
}

export type ApiError = {
	type: "error"
	message: string
	code: string
	error: any
}