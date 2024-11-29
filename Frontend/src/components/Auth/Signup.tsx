import React, { useState } from "react";
import { signUpWithEmail } from "../../firebase/auth";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await signUpWithEmail(email, password);
            console.log("Signup Success: ", user);
        } catch (error) {
            setError("Failed to sign up.");
        }
    };

    return (
        <div className="auth-container mt-40">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
        </form>
        {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default Signup;



