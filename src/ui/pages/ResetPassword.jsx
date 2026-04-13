import { useLocation } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import ResetPasswordUseCase from "../../application/user/ResetPassword";
import UserRepositoryImpl from "../../infrastructure/api/testImpl";

const { Title } = Typography;

export default function ResetPassword() {

    const [loading, setLoading]         = useState(false);
    const [messageApi, contextHolder]   = message.useMessage();

    const navigate                      = useNavigate();

    const location                      = useLocation(); // hook avy amin'ny react-router
    const [token, setToken]             = useState(null);
    // const searchParams = new URLSearchParams(location.search);
    // const token = searchParams.get("token");

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setToken(searchParams.get("token")); // mamerina 'ABC123XYZ'
    }, [location]);

    const onFinish = async (values) => {

        if (values.password !== values.confirmPassword) {
            return messageApi.error("Passwords do not match");
        }

        setLoading(true);

        try {
            const useCase = new ResetPasswordUseCase(new UserRepositoryImpl());

            console.log(token, values.password);
            
            await useCase.execute(token, values.password);

            messageApi.success("Password updated successfully");

            // redirect login
            navigate("/login");

        } catch (err) {
            messageApi.error("Error updating password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            {contextHolder}

            <Title level={2}>Reset Password</Title>

            <Form layout="vertical" onFinish={onFinish}>

                <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                        { required: true, message: "Enter new password" },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Min 8 chars, include uppercase, lowercase, number & special character",
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: "Confirm password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="btn-yellow"
                >
                    Reset Password
                </Button>

                <Button
                    htmlType="button"
                    className="btn-gray"
                    // onClick={() => navigate("/")}
                >
                    CANCEL
                </Button>

            </Form>
        </div>
    );
}