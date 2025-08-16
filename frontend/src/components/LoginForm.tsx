import React from "react";

type LoginFormProps = {
    onClose?: () => void;
    onSubmit: (email: string, password: string) => void;
    onGoogleLogin?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onGoogleLogin }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setError(null);
        onSubmit(email, password);
    };

    const handleGoogleLogin = () => {
        if (onGoogleLogin) {
            onGoogleLogin();
        } else {
            alert("Google login not implemented.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-700 p-10 gap-2 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-semibold">Login</h2>
            <form className="flex flex-col gap-2 p-2 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-lg font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(null); }}
                        required
                        className="border-1 border-white p-2 rounded-lg text-xl text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-lg font-semibold">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError(null); }}
                        required
                        className="border-1 border-white p-2 rounded-lg text-xl text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full"
                        placeholder="Enter your password"
                    />
                </div>
                {error && <p className="text-sm text-center bg-red-200/70 font-normal w-full py-1">{error}</p>}
                <button type="submit" className="p-3 m-2 mt-1 mx-0 bg-blue-200 text-gray-600 rounded-xl font-semibold hover:scale-105 transition-transform">Login</button>
            </form>
            <button
                onClick={handleGoogleLogin}
                className="p-2 m-2 bg-red-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform w-full"
            >
                Continue with Google
            </button>

            <div className="flex justify-center mt-1">
                <span className="text-gray-300 mr-2">Don't have an account?</span>
                <a href="/register" className="text-blue-400 underline hover:text-blue-600">Register</a>
            </div>
        </div>
    );
};

export default LoginForm;