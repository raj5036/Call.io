import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ApiClient } from '../../api/ApiClient';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const Input = ({
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
	autoComplete,
}: {
	label: string;
	type?: string;
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	autoComplete?: string;
}) => {
	return (
		<label className="block text-sm mb-3">
			<span className="mb-1 block text-gray-200">{label}</span>
			<input
				className="w-full rounded-2xl bg-gray-800/50 border border-gray-700 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				autoComplete={autoComplete}
			/>
		</label>
	);
};

const Button = ({
	children,
	type = 'button',
	onClick,
	disabled,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 font-medium shadow"
		>
			{children}
		</button>
	);
};

const Card = ({
	children,
	title,
	footer,
}: {
	children: React.ReactNode;
	title: string;
	footer?: React.ReactNode;
}) => {
	return (
		<div className="max-w-md w-full rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
			<h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
			<div className="space-y-3">{children}</div>
			{footer && (
				<div className="pt-4 text-sm text-center text-gray-400">{footer}</div>
			)}
		</div>
	);
};

const LoginForm = ({ switchToSignup }: { switchToSignup: () => void }) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const useLoginMutation = () => {
		const { setAuth } = useAuth();
		return useMutation({
			mutationFn: (payload: { email: string; password: string }) =>
				ApiClient.Auth.login(payload),
			onSuccess: (data) => {
				setAuth(data);
			},
			onError: (err) => console.error("Couldn't login", err),
		});
	};
	const { mutateAsync: login, isPending, error } = useLoginMutation();

	return (
		<Card
			title="Welcome back"
			footer={
				<>
					New here?{' '}
					<button
						className="text-indigo-400 hover:underline"
						onClick={switchToSignup}
					>
						Create an account
					</button>
				</>
			}
		>
			<Input
				label="Email"
				type="email"
				value={email}
				onChange={setEmail}
				autoComplete="email"
				placeholder="you@example.com"
			/>
			<Input
				label="Password"
				type="password"
				value={password}
				onChange={setPassword}
				autoComplete="current-password"
			/>
			{error && (
				<div className="text-red-400 text-sm">
					{(error as any)?.response?.data?.message || (error as Error).message}
				</div>
			)}
			<Button
				type="button"
				onClick={async () => await login({ email, password })}
				disabled={isPending || !email || !password}
			>
				{isPending ? 'Signing in...' : 'Sign in'}
			</Button>
		</Card>
	);
};

const SignupForm = ({ switchToLogin }: { switchToLogin: () => void }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const useSignupMutation = () => {
		const { setAuth } = useAuth();
		return useMutation({
			mutationFn: () => ApiClient.Auth.signup({ name, email, password }),
			onSuccess: data => {
				setAuth(data);
			},
			onError: err => console.error('Couldn\'t signup', err)
		});
	};
	const { mutateAsync: signup, isPending, error } = useSignupMutation();

	return (
		<Card
			title="Create your account"
			footer={
				<>
					Already have an account?{' '}
					<button
						className="text-indigo-400 hover:underline"
						onClick={switchToLogin}
					>
						Sign in
					</button>
				</>
			}
		>
			<Input
				label="Name"
				value={name}
				onChange={setName}
				placeholder="Your name"
			/>
			<Input
				label="Email"
				type="email"
				value={email}
				onChange={setEmail}
				autoComplete="email"
				placeholder="you@example.com"
			/>
			<Input
				label="Password"
				type="password"
				value={password}
				onChange={setPassword}
				autoComplete="new-password"
			/>
			{error && (
				<div className="text-red-400 text-sm">
					{(error as any)?.response?.data?.message || (error as Error).message}
				</div>
			)}
			<Button
				type="button"
				onClick={async () => await signup()}
				disabled={isPending || !email || !password || !name}
			>
				{isPending ? 'Signing up...' : 'Create account'}
			</Button>
		</Card>
	);
};

const AuthedBanner = () => {
	const { token, user, logout } = useAuth();
	return (
		<div className="max-w-xl w-full rounded-3xl border border-green-900 bg-green-950 p-6 text-green-100 shadow-xl">
			<h2 className="text-xl font-semibold mb-2">You're logged in ✅</h2>
			<pre className="text-xs whitespace-pre-wrap break-all bg-black/30 p-3 rounded-2xl">{JSON.stringify({ token, user }, null, 2)}</pre>
			<div className="pt-4 flex gap-3">
				<button
					onClick={logout}
					className="rounded-2xl bg-gray-800 hover:bg-gray-700 px-4 py-2 text-sm"
				>
					Log out
				</button>
				<span className="text-xs opacity-80 self-center">(Token also cleared from localStorage)</span>
			</div>
		</div>
	);
};

const AuthPage = () => {
	const { token } = useAuth();
	const [mode, setMode] = useState<"login" | "signup">("login");

	if (token) return <AuthedBanner />;

	return (
		<div className="w-full min-h-svh grid place-items-center bg-gradient-to-b from-gray-950 to-black text-white p-6">
			<div className="flex flex-col items-center gap-6">
				<div className="flex rounded-2xl bg-gray-800 p-1 text-sm">
					<button
						onClick={() => setMode("login")}
						className={`px-4 py-2 rounded-xl ${mode === "login" ? "bg-gray-900" : "hover:bg-gray-700"}`}
					>
						Login
					</button>
					<button
						onClick={() => setMode("signup")}
						className={`px-4 py-2 rounded-xl ${mode === "signup" ? "bg-gray-900" : "hover:bg-gray-700"}`}
					>
						Signup
					</button>
				</div>
				{mode === "login" ? (
					<LoginForm switchToSignup={() => setMode("signup")} />
				) : (
					<SignupForm switchToLogin={() => setMode("login")} />
				)}
			</div>
		</div>
	);
};

export default AuthPage;