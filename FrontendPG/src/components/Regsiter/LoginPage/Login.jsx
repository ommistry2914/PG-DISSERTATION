import React from 'react'
import clg from '../../../assests/techo-home.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import './Login.css'

const Login = () => {
  return (
    <>
      <div className="form-main">

        <div className="form-left">
          <h2>Welcome Back !</h2>
          <div className="form-img">
            <img src={clg} alt="website image" />
          </div>
          <div className="info-text">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi corrupti ratione maiores quaerat nam aliquid animi delectus magnam et quam?</p>
          </div>
        </div>

        <div className="form-right">
          <div className="form-content">
          <h3>Login to your account</h3>
          <Form >

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
                
                 size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember"  valuePropName="checked" noStyle>
                  <Checkbox className='remember'>Remember me</Checkbox>
                  
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