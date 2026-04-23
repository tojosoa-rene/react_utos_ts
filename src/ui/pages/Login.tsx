// Fichier de la page de login
// - il utilise Ant Design pour le formulaire et les composants UI
// - il utilise le use case LoginUser pour gérer la logique métier de la connexion
// - il utilise Redux pour gérer l'état global de l'authentification (dispatch des actions loginStart, loginSuccess, loginError)

import { Form, Input, Button, message, Typography  } from "antd";
import { useNavigate } from "react-router-dom"; // pour la navigation entre les pages

// utiliser hooks typés (important)
import { useAppDispatch } from "../../store/hooks";

// actions Redu
import { loginStart, loginSuccess, loginError } from "../../store/features/auth/authSlice";

import LoginUser from "../../application/user/LoginUser";
import UserRepositoryImpl from "../../infrastructure/api/UserRepositoryImpl";

// type des données du formulaire
type LoginFormValues = {
  email: string;
  password: string;
};


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { Text, Link } = Typography;

    const onFinish = async (values: LoginFormValues) => {
        dispatch(loginStart());

        const repo      = new UserRepositoryImpl();
        const loginUser = new LoginUser(repo);

        try {
            const result = await loginUser.execute(values.email, values.password);

            dispatch(loginSuccess(result));

            message.success("Login successful");

        } catch (error: unknown) {
            // bonne pratique TS (éviter any)
            const err = error as Error;

            dispatch(loginError(err.message));
            message.error(err.message);
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
            </Form>
        </div>
    );
};

export default Login;