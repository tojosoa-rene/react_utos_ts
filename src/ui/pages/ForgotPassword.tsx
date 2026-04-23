// src/ui/pages/ForgotPassword.jsx

import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFailure } from "../../store/features/auth/authSlice";

import ForgotPasswordUseCase from "../../application/user/ForgotPassword";
import UserRepositoryImpl from "../../infrastructure/api/UserRepositoryImpl";

const { Title } = Typography;

type ForgotPasswordFormValues = {
    email: string;
};

export default function ForgotPassword() {
    
    const dispatch                      = useAppDispatch();
    const navigate                      = useNavigate();
    const { status }                    = useAppSelector((state) => state.auth);

    const [messageApi, contextHolder]   = message.useMessage();

    const onFinish = async (values: ForgotPasswordFormValues) => {

        dispatch(forgotPasswordStart());

        try {
            const useCase = new ForgotPasswordUseCase(new UserRepositoryImpl());

            await useCase.execute(values.email);

            dispatch(forgotPasswordSuccess("Reset email sent !"));

        } catch (err : unknown) {
            const error = err as Error;
            
            dispatch(forgotPasswordFailure(error.message));
        } 
    };

    useEffect(() => {
        if (status === "success") {
            messageApi.success("Reset email sent !");
        }

        if (status === "error") {
            messageApi.error("User not found");
        }
    }, [status]);

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