import React from 'react';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.less';
import Logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';

const { Item, useForm } = Form;

function Login() {
  const [form] = useForm();
  const navigator = useNavigate();

  return (
    <div className="login-page-content">
      <div className="login-page-logo">
        <img src={Logo} alt="logo" />
        <div>XGit</div>
      </div>
      <div>
        <Form form={form} layout="vertical" requiredMark={true} autoComplete="off">
          <Item name="username" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名或电子邮件" />
          </Item>
          <Item name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Item>
          <Item>
            <Item name="remember" noStyle>
              <Checkbox defaultChecked={false}>记住账号</Checkbox>
            </Item>
            <a className="login-form-forgot" href="" style={{ float: 'right' }}>
              忘记密码
            </a>
          </Item>
          <Item colon={false} style={{ marginBottom: 0 }}>
            <Button type="primary" style={{ width: '100%' }}>登录</Button>
          </Item>
          <Divider plain style={{ margin: '0.5rem 0' }}>没有账号</Divider>
          <Item colon={false}>
            <Button type="default" onClick={() => navigator('/signup')} style={{ width: '100%' }}>注册</Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;