// src/ui/pages/ForgotPassword.jsx

import { Form, Input, Button, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure } from "../../store/features/auth/authSlice";

import ForgotPasswordUseCase from "../../application/user/ForgotPassword";
import UserRepositoryImpl from "../../infrastructure/api/UserRepositoryImpl";

const { Title } = Typography;

export default function ForgotPassword() {
    
    const dispatch                      = useDispatch();
    const navigate                      = useNavigate();
    const { status }                    = useSelector((state) => state.auth);

    const [messageApi, contextHolder]   = message.useMessage();

    const onFinish = async (values) => {
        console.log(values);
        dispatch(forgotPasswordStart());

        try {
            const useCase = new ForgotPasswordUseCase(new UserRepositoryImpl());

            await useCase.execute(values.email);

            dispatch(forgotPasswordSuccess("Reset email sent !"));

            messageApi.success("Reset email sent !");
        } catch (err) {
            dispatch(forgotPasswordFailure(err.message));

            messageApi.error("User not found");
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