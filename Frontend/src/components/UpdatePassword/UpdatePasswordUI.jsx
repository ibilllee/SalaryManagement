import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const UpdatePasswordUI = (props) => {
  return (
    <div style={{backgroundColor:"white"}}>
      <Form
        name="update_password"
        className="login-form"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={props.updatePassword}
        style={{margin:"20px auto",padding:"50px 0px", width:"280px"}}
      >

      <h1 style={{textAlign:"center",marginBottom:"20px"}}>账号密码修改</h1>
        <Form.Item
          name="old_password"
          label="旧密码"
          rules={[
            {
              required: true,
              message: "请输入旧密码!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入旧密码"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              message: "请输入新密码",
            },
            () => ({
              validator(_, value) {
                let regExp=/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
                if(regExp.test(value))
                  return Promise.resolve();
                return Promise.reject(new Error('密码不合规范：6-18位，且必须包含数字、英文字母，不包含特殊字符'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="长度6-18位，且包含数字、英文字母"
          />
        </Form.Item>

        <Form.Item
          name="rep_password"
          label="确认新密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请再次输入密码",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不同'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请再次确认新密码"
          />
        </Form.Item>

        <Form.Item style={{textAlign:"center",marginTop:"40px"}}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePasswordUI;
