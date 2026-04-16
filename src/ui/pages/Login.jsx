import { Form, Input, Button, message, Typography  } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginStart, loginSuccess, loginError } from "../../store/features/auth/authSlice";

import LoginUser from "../../application/user/LoginUser";
import UserRepository from "../../infrastructure/api/UserRepositoryImpl";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { Text, Link } = Typography;

    const onFinish = async (values) => {
        dispatch(loginStart());

        const repo      = new UserRepository();
        const loginUser = new LoginUser(repo);

        try {
            const result = await loginUser.execute(values.email, values.password);
            dispatch(loginSuccess(result));

            // console.log(result);
            

            message.success("Login successful");

        } catch (error) {
            dispatch(loginError(error.message));
            message.error(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>LOGIN</h2>

            <Form layout="vertical" onFinish={onFinish}>

                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Email required" },
                        { type: "email", message: "Invalid email address" }
                    ]}
                    autoComplete="off"
                >
                    <Input placeholder="Email" />
                </Form.Item>

                {/* Password */}
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Password required" }
                    ]}
                    className="password-wrapper"
                    autoComplete="off"
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                {/* Forgot password */}
                <p
                    className="forgot-password"
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot password?
                </p>

                {/* Buttons */}
                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="btn-yellow"
                    >
                        SIGN IN
                    </Button>

                    <Button
                        htmlType="button"
                        className="btn-gray"
                        onClick={() => navigate("/")}
                    >
                        CANCEL
                    </Button>
                </Form.Item>
            {/* Signup */}
            <Text type="secondary">
                <Link onClick={() => navigate("/signup")}>
                    Don't have an account?{"| "} Sign up
                </Link>
            </Text>
            </Form>
        </div>
    );
};

export default Login;