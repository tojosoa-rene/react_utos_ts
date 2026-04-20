import { Form, Input, Button, message } from "antd";

function ContactForm() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log(values);

    messageApi.success("Form submitted successfully");

    form.resetFields();
  };

  const handleReset = () => {
    form.resetFields();
    messageApi.info("Form cleared");
  };

  return (
    <div className="form-card">

      {contextHolder}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" }
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        {/* Subject */}
        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: "Please enter a subject" }]}
        >
          <Input placeholder="Enter subject" />
        </Form.Item>

        {/* Message */}
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter a message" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter message" />
        </Form.Item>

        {/* Buttons */}
        <div className="form-buttons">
          <Button onClick={handleReset} className="btn-gray">
            Reset
          </Button>

          <Button type="primary" htmlType="submit" className="btn-yellow">
            Submit
          </Button>
        </div>

      </Form>
    </div>
  );
}

export default ContactForm;