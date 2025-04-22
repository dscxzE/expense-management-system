import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";
const Login = () => {
  const img =
    "https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="login-page">
        {loading && <Spinner />}
        <div className="row container">
          <div className="text-center mb-5">
            <h1>
              <span className="text-primary">Expense</span> Management System
            </h1>
            <p className="text-light">Track your finances with ease</p>
          </div>
          <div className="col-md-6 img-container">
            <img
              src={img}
              alt="login-img"
              width={"100%"}
              height="100%"
              className="rounded shadow"
            />
          </div>
          <div className="col-md-4 offset-md-1 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Welcome Back</h1>
              <p className="text-light mb-4">Please sign in to continue</p>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} type="email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <div className="d-flex flex-column gap-2">
                <button className="btn w-100">Sign In</button>
                <div className="text-center mt-3">
                  <Link to="/register">
                    Don't have an account? Register now
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
