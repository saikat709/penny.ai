import React from "react";
import Modal from "../components/Modal";


const RegisterPage: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError(null);
        // TODO: handle registration logic here
        alert(`Registered with email: ${email}`);
    };

    const handleGoogleRegister = () => {
        // TODO: handle Google registration logic here
        alert("Google registration not implemented.");
    };

    return (
        <Modal isOpen>
            <div className="flex flex-col items-center justify-center bg-gray-700 p-10 gap-2 rounded-lg shadow-lg w-full min-w-[320px]">
                <h2 className="text-2xl font-semibold">Register</h2>
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
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={e => { setConfirmPassword(e.target.value); setError(null); }}
                            required
                            className="border-1 border-white p-2 rounded-lg text-xl text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full"
                            placeholder="Confirm your password"
                        />
                    </div>
                    {error && <p className="text-sm text-center bg-red-200/70 font-normal w-full py-1">{error}</p>}
                    <button type="submit" className="p-3 m-2 mt-1 mx-0 bg-blue-200 text-gray-600 rounded-xl font-semibold hover:scale-105 transition-transform">Sign Up</button>
                </form>
                <button
                    onClick={handleGoogleRegister}
                    className="p-2 m-2 bg-red-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform w-full flex items-center justify-center gap-2"
                >
                    <img src="/penny.svg" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                <div className="flex justify-center mt-1">
                    <span className="text-gray-300 mr-2">Already have an account?</span>
                    <a href="/login" className="text-blue-400 underline hover:text-blue-600">Log in</a>
                </div>
            </div>
        </Modal>
    );
};

export default RegisterPage;