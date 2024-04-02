import React from 'react'
import clg from '../../../assests/techo-home.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import Lottie from 'lottie-react';
import HeadAnim from '../../../assests/HeadAnimation.json';


import './Login.css'

const Login = () => {
  const [form] = Form.useForm();
  const inputStyle = {
    borderColor: '#D1AEF9',
    color:'#8230C6',
    backgroundColor: '#f0f2f5',
  };
  return (
    <>
      <div className="form-main-login">

        <div className="form-lefttt">
          <div className="anim-div">
          <Lottie animationData={HeadAnim}/>
          </div>
        </div>

        <div className="form-righttt">
          <div className="form-content">
          <h3>Login to your account</h3>
          <Form form={form}>

              <Form.Item className='input-field'
                    hasFeedback
                name="username"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input
                
                 size='large' prefix={<UserOutlined className="site-form-item-icon" />} 
                 placeholder="Email"
                 style={inputStyle} />
              </Form.Item>

              <Form.Item className='input-field'
                    hasFeedback
                name="password"
                validateTrigger="onBlur"

                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input size='large'
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  style={inputStyle}
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember"  valuePropName="checked" noStyle>
                  <Checkbox className='remember' style={{color:'#8230C6',fontWeight:'500'}}>Remember me</Checkbox>
                  
                </Form.Item>
                <a className="login-form-forgot" href="">
                  Forgot password ?
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
              <span >
                or <a href="" className='register-link'> Sign up</a>
              </span>

            </Form>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Login