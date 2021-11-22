import React from "react";
import {Form, Input, Button, Row, Col, Image, Popover} from "antd";
import {UserOutlined, LockOutlined, SafetyCertificateOutlined} from "@ant-design/icons";
import "./LoginForm.css"


const LoginFormUI = (props) => {
  return (
    <div style={{padding: '5px'}}>
      <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        requiredMark={false}
        initialValues={{
          remember: true,
        }}
        onFinish={props.submitLogin}
        style={{marginBottom:'-20px'}}
      >
        <Form.Item
          style={{marginTop:'-10px'}}
          className="FormItem"
          name="username"
          label={props.input1Label}
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon"/>}
            placeholder={props.input1Placeholder}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={props.input2Label}
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            placeholder={props.input2Placeholder}
          />
        </Form.Item>

        <Form.Item label="验证码" hidden={!props.needCaptcha}>
          <Row>
            <Col flex="160px">
              <Form.Item
                name="verifyCode"
                noStyle
                rules={[{required: props.needCaptcha, message: "请输入验证码",},]}
              >
                <Input
                  prefix={<SafetyCertificateOutlined className="site-form-item-icon"/>}
                  placeholder="请输入数字验证码"/>
              </Form.Item>

            </Col>
            <Col flex="auto"/>
            <Col flex="100px">
              <Popover content={<div>点击刷新</div>}>
                <Image src={props.captchaImg} height='34px' preview={false} onClick={props.getCaptcha} alt="暂停访问">
                </Image>
              </Popover>
              <div style={{color: '#999999', textAlign: 'center'}}>点击可刷新</div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item style={{textAlign: 'center',marginTop:'30px'}}>
          <Button type="primary" htmlType="submit" size="large">登录</Button>
        </Form.Item>
        <Form.Item style={{textAlign: 'center',marginTop:'30px'}}>
          <Button type="link"><a href="http://8.135.61.132/salary">进入旧版系统</a></Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginFormUI;