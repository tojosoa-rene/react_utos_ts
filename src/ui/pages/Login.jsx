import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginStart, loginSuccess, loginError } from "../../store/features/auth/authSlice";

import LoginUser from "../../application/user/LoginUser";
import UserRepository from "../../infrastructure/api/userRepositoryImpl";

const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // important

         console.log(email, password);

        dispatch(loginStart());

        const repo      = new UserRepository();
        const loginUser = new LoginUser(repo);

        try {
            const result = await loginUser.execute(email, password);

            dispatch(loginSuccess(result));
        } catch (error) {
            dispatch(loginError(error.message));
        }
    };

    return (
        <div className="login-container">
            <h2>LOGIN</h2>

            {/* Email */}
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password + 👁️ */}
            <div className="password-wrapper">
                <input
                    type={"password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Forgot password */}
            <p
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
            >
                Forgot password?
            </p>

            {/* Buttons */}
            <button className="btn-yellow" onClick={handleLogin}>
                SIGN IN
            </button>

            <button className="btn-gray" onClick={() => navigate("/")}>
                CANCEL
            </button>
        </div>
    );
};

export default Login;