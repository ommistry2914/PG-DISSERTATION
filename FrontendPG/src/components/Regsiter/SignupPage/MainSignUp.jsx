
// MainSignUp.js
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import Lottie from 'lottie-react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import HeadAnim from '../../../assests/HeadAnimation.json';
import './MainSignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MainSignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [role, setRole] = useState('student'); // Default role is student

  const inputStyle = {
    borderColor: '#D1AEF9',
    color: '#8230C6',
    backgroundColor: '#f0f2f5',
  };

  const handleSignUp = async (values) => {
    console.log('Received values:', values);
     console.log(role);
    

    try {
      // Make a POST request to your backend API to save user data
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username: values.username,
        email:values.email,
        password: values.password,
        roles: [role], // Roles passed as array
      });

      // Check if the signup was successful
      if (response.status === 200) {
        console.log('User signed up successfully');
        navigate('/login');
        // You can add additional logic here, such as redirecting to another page
      } else {
        console.error('Error signing up user');
        // Handle error scenario
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenario
    }
  };

  return (
    <div className="form-main-signup">
      <div className="form-left">
        <div className="anim-div">
          <Lottie animationData={HeadAnim} />
        </div>
      </div>

      <div className="form-right">
        <div className="form-content">
          <h3>Welcome...</h3>
          <Form form={form} onFinish={handleSignUp}>

          <Form.Item
              className='input-field'
              hasFeedback
              name="username"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  type: 'username',
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input
                size='large'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item
              className='input-field'
              hasFeedback
              name="email"
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
                size='large'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item
              className='input-field'
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
              <Input
                size='large'
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item
              className='input-field'
              hasFeedback
              name="confirmPassword"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your Password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input
                size='large'
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
                style={inputStyle}
              />
            </Form.Item>

            <Form.Item className='input-field'>
              <div className="role-container">
                <div className="role-label" >Role :</div>
                <Radio.Group onChange={(e) => setRole(e.target.value)} value={role}>
                  <Radio className="radio-item" value="student">Student</Radio>
                  <Radio className="radio-item" value="guide">Guide</Radio>
                </Radio.Group>
              </div>
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className='remember' style={{ color: '#8230C6', fontWeight: '500' }}>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="signup-button">
                Sign Up
              </Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default MainSignUp;
