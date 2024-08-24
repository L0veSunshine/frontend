import React, { type MouseEvent } from 'react';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useIntl } from '../utils/i18n/intl.tsx';
import './login.less';

const { Item, useForm } = Form;

type FormData = {
  username: string;
  password: string;
  remember: boolean;
}

function Login() {
  const [form] = useForm();
  const navigator = useNavigate();
  const { trans } = useIntl();

  const onFormFinish = (value: FormData) => {
    // todo
    console.log(value);
  };

  const toResetPassPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator('/recover');
  };

  return (
    <div className="login-page-content">
      <div className="login-page-logo">
        <img src={Logo} alt="logo" />
        <div>XGit</div>
      </div>
      <div>
        <Form<FormData> form={form} layout="vertical" requiredMark={true} autoComplete="off"
          initialValues={{ remember: false }} onFinish={onFormFinish}>
          <Item name="username" rules={[{ required: true, message: '请输入用户名或电子邮箱' }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名或电子邮件" allowClear />
          </Item>
          <Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder={trans('password')} allowClear />
          </Item>
          <Item style={{ userSelect: 'none' }}>
            <Item name="remember" valuePropName="checked" noStyle>
              <Checkbox defaultChecked={false}>记住账号</Checkbox>
            </Item>
            <a className="login-form-forgot" onClick={toResetPassPage} style={{ float: 'right' }}>
              忘记密码
            </a>
          </Item>
          <Item colon={false} style={{ marginBottom: 0 }}>
            <Button type="primary" style={{ width: '100%' }} onClick={form.submit}>登录</Button>
          </Item>
          <Divider plain style={{ margin: '.75rem 0', userSelect: 'none' }}>没有账号</Divider>
          <Item colon={false}>
            <Button type="default" onClick={() => navigator('/signup')} style={{ width: '100%' }}>注册</Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;