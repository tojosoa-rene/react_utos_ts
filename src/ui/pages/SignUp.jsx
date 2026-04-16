import { Form, Input, Button, Select, DatePicker, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Signup = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log(values);
        message.success("Registration successful !");
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>

            <Form layout="vertical" onFinish={onFinish}>

                {/* Country + User Type */}
                <div className="row">
                    <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                        <Select placeholder="Select country">
                            <Option value="mauritius">Mauritius</Option>
                            <Option value="madagascar">Madagascar</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="userType" label="User type" rules={[{ required: true }]}>
                        <Select placeholder="Select user type">
                            <Option value="client">Client</Option>
                            <Option value="admin">Admin</Option>
                        </Select>
                    </Form.Item>
                </div>

                {/* More info */}
                <Form.Item name="info" label="More information">
                    <Input.TextArea placeholder="More information..." />
                </Form.Item>

                {/* Title + First Name */}
                <div className="row">
                    <Form.Item name="title" label="Title">
                        <Select placeholder="Title">
                            <Option value="mr">Mr</Option>
                            <Option value="mrs">Mrs</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </div>

                {/* Last Name + DOB */}
                <div className="row">
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="dob" label="Date of birth">
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                </div>

                {/* Email */}
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true },
                        { type: "email", message: "Invalid email" }
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Address */}
                <Form.Item name="address" label="Address">
                    <Input.TextArea />
                </Form.Item>

                {/* Company + Telephone */}
                <div className="row">
                    <Form.Item name="company" label="Company">
                        <Input />
                    </Form.Item>

                    <Form.Item name="telephone" label="Telephone">
                        <Input />
                    </Form.Item>
                </div>

                {/* Mobile + Fax */}
                <div className="row">
                    <Form.Item name="mobile" label="Mobile">
                        <Input />
                    </Form.Item>

                    <Form.Item name="fax" label="Fax">
                        <Input />
                    </Form.Item>
                </div>

                {/* Checkbox */}
                <Form.Item name="notifications" valuePropName="checked">
                    <Checkbox>I want to receive notification emails</Checkbox>
                </Form.Item>

                {/* Buttons */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-yellow">
                        S'INSCRIRE
                    </Button>

                    <Button
                        className="btn-gray"
                        onClick={() => navigate("/login")}
                    >
                        SIGN IN
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default Signup;