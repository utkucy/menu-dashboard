import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import Router from "next/router";

import styled from "styled-components";
import UserService from "services/user";

class LoginPage extends React.Component {
  async onLogin(values: Store) {
    await UserService.login(values.email, values.password);
  }

  registerClick() {
    Router.push("/sign-up");
  }

  render() {
    return (
      <Container>
        <Form
          name="normal_login"
          style={{ width: 300 }}
          initialValues={{ remember: true }}
          onFinish={this.onLogin}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "E-Posta alanı boş kalamaz" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-Posta"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi giriniz" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Şifre"
            />
          </Form.Item>
          <Form.Item>
            <Row gutter={16}>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                span={12}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button type="link" style={{ float: "right" }} href="">
                  Forgot password
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Log in
            </Button>
            Or{" "}
            <Button onClick={this.registerClick} type="link">
              register now!
            </Button>
          </Form.Item>
        </Form>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
