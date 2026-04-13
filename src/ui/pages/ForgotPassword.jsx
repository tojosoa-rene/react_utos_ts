// src/ui/pages/ForgotPassword.jsx

import { Form, Input, Button, Typography, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ForgotPasswordUseCase from "../../application/user/forgot";
import UserRepositoryImpl from "../../infrastructure/api/testImpl";

const { Title } = Typography;

export default function ForgotPassword() {

    const navigate                      = useNavigate();

    const [loading, setLoading]         = useState(false);
    const [messageApi, contextHolder]   = message.useMessage();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const useCase = new ForgotPasswordUseCase(new UserRepositoryImpl());

            await useCase.execute(values.email);

            messageApi.success("Reset email sent !");
        } catch (err) {
            messageApi.error("User not found");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            {contextHolder}

            <Title level={2}>Forgot Password</Title>

            <Form
                name="forgot-password"
                layout="vertical"
                onFinish={onFinish}
            >
                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Invalid email format" }
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                {/* Submit */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="btn-yellow"
                    >
                        Send reset link
                    </Button>

                    <Button
                        htmlType="button"
                        className="btn-gray"
                        onClick={() => navigate("/login")}
                    >
                        CANCEL
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}