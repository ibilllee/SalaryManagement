import React from "react";
import {Form, Input, Button} from "antd";
import {
  UserOutlined,
  LockOutlined
} from "@ant-design/icons";

const AddUserFormUI = (props) => {
  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        ref={props.formRef}
        initialValues={{remember: true}}
        layout="vertical"
        requiredMark="optional"
        onFinish={props.addAccount}
      >
        <Form.Item
          name="name"
          rules={[{required: true, message: '请输入姓名!'}]}
          label="姓名"
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="姓名"/>
        </Form.Item>
        <Form.Item
          name="username"
          label="身份证号"
          hasFeedback
          rules={[
            {
              required: true,
              message: "请输入身份证号",
            },
            () => ({
              validator(_, value) {
                let regExp = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if (regExp.test(value))
                  return Promise.resolve();
                return Promise.reject(new Error('请输入一个合法的身份证号'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            placeholder="身份证号"
          />
        </Form.Item>

        <Form.Item style={{textAlign: 'center'}}>
          <Button style={{width: '90px'}} type="primary" htmlType="submit" className="login-form-button">
            添加
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUserFormUI;