import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../../../rudux/api/authApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../../rudux/slices/authslices";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [userLogin, { data, isSuccess, isLoading }] = useUserLoginMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    userLogin(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logIn({ token: data.token }));
      notification.success({
        message: "Successfully logged in! Go ahead 😊",
      });
      navigate("/auth/signup/");
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="p-4 w-full"
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={2} className="text-center">
        Login
      </Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit" loading={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </Form.Item>

      <Text>
        Don't have an account? <Link to="/auth/signup">Sign Up</Link>
      </Text>
    </Form>
  );
};

export default Login;
