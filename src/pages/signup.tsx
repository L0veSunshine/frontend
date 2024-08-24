import React, { useCallback, useState, type KeyboardEvent } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { useNavigate, } from 'react-router-dom';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useIntl } from '../utils/i18n/intl.tsx';
import { checkEmail, checkUsername } from '../api/webApi.ts';
import './signup.less';
import Logo from '../../assets/img/logo.png';

const { Item, useForm } = Form;

const PassRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

async function validateUsername(name: string): Promise<Error | void> {
  if (!name) {
    return Promise.resolve();
  }
  const resp = await checkUsername(name);
  if (resp.status === 200) {
    return resp.data.valid ? Promise.resolve() : Promise.reject(new Error('用户名已被使用'));
  }
  return Promise.reject(new Error('检查用户名失败'));
}

async function validateEmail(email: string): Promise<Error | void> {
  if (!email) {
    return Promise.resolve();
  }
  const resp = await checkEmail(email);
  if (resp.status === 200) {
    return resp.data.valid ? Promise.resolve() : Promise.reject(new Error('邮箱已被使用'));
  }
  return Promise.reject(new Error('检查邮箱失败'));
}

interface SignupFormData {
  email: string;
  password: string;
  username: string;
}

const Fields: (keyof SignupFormData)[] = ['email', 'password', 'username'];

function Signup() {
  const [form] = useForm();
  const navigator = useNavigate();
  const { trans } = useIntl();
  const [fieldsStatus, setFieldStatus] = useState<[boolean, boolean]>([false, false]);

  const changeFieldStatus = useCallback((index: number) => {
    return (event: KeyboardEvent) => {
      const fieldName = Fields[index];
      if (event.key === 'Enter' && !form.isFieldValidating(fieldName) && form.getFieldError(fieldName).length === 0) {
        setFieldStatus(prev => {
          prev[index] = true;
          return [...prev];
        });
      }
    };
  }, [form]);

  return (
    <div className="signup-page-container">
      <div className="signup-page-logo">
        <img src={Logo} alt="logo" />
        <div>XGit</div>
      </div>
      <div>
        <Form<SignupFormData> form={form} requiredMark={false} autoComplete={'off'}
          onFinish={value => console.log(value)} initialValues={{ email: '' }}>
          <Item name="email" hasFeedback validateDebounce={500} validateFirst
            rules={[{ required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确邮箱地址' },
              { validator: (_, value: string) => validateEmail(value) }
            ]}>
            <Input prefix={<MailOutlined />} placeholder="邮箱" maxLength={255} allowClear
              onKeyDown={changeFieldStatus(0)} />
          </Item>
          <Item noStyle shouldUpdate={fieldsStatus.some(s => !s)}>{
            fieldsStatus[0] &&
            <Item name="password" hasFeedback validateFirst
              rules={[{ required: true, message: '请设置密码' },
                { pattern: PassRegExp, message: '密码长度不小于8位且包含字母大小写' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder={trans('password')} maxLength={255} allowClear
                onKeyDown={changeFieldStatus(1)} />
            </Item>}
          </Item>
          <Item noStyle shouldUpdate={fieldsStatus.some(s => !s)}>
            {fieldsStatus[1] &&
              <Item name="username" hasFeedback validateDebounce={500} validateFirst
                rules={[
                  { required: true, message: '请设置用户名' },
                  { validator: (_, value: string) => validateUsername(value) }
                ]}>
                <Input prefix={<UserOutlined />} placeholder="用户名" maxLength={255} allowClear />
              </Item>}
          </Item>
          {fieldsStatus.every(s => s) &&
            <Item colon={false} style={{ marginBottom: 0 }}>
              <Button type="primary" style={{ width: '100%' }}
                onClick={form.submit}>注册</Button>
            </Item>
          }
          <Divider plain style={{ margin: '.75rem 0', userSelect: 'none' }}>已有账号</Divider>
          <Item colon={false}>
            <Button type="default" onClick={() => navigator('/login')} style={{ width: '100%' }}>登录</Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;