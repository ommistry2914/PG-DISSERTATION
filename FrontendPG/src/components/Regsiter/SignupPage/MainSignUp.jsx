
// import React, { useState } from 'react';
// import { Typography, Input, Button, Radio } from 'antd';
// import { Link } from 'react-router-dom';
// import Lottie from 'lottie-react';
// import HeadAnim from '../../../assests/HeadAnimation.json';

// import './MainSignUp.css';

// const { Title } = Typography;

// const MainSignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('student'); // Default role is student

//   const handleSignUp = () => {
//     // Add your sign up logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//     console.log('Confirm Password:', confirmPassword);
//     console.log('Role:', role);
//     // You can add your sign up API call or any other logic here
//   };

//   return (
//     <>
//       <div className="form-main">
//         <div className="form-left">
//           <div className="anim-div">
//             <Lottie animationData={HeadAnim} />
//           </div>
//         </div>

//         <div className="form-right">
//           <Title level={2}>Welcome to [Website Name]</Title>
//           <Input
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="signup-input"
//           />
//           <Input.Password
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="signup-input"
//           />
//           <Input.Password
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="signup-input"
//           />
//           <div className="role-label">Role:</div>
//           <div className="role-radio-group">
//             <Radio.Group onChange={(e) => setRole(e.target.value)} value={role}>
//               <Radio className="radio-item" value="student">Student</Radio>
//               <Radio className="radio-item" value="guide">Guide</Radio>
//             </Radio.Group>
//           </div>
//           <Button className="signup-button" onClick={handleSignUp}>
//             Sign Up
//           </Button>
//           <div>
//             Already have an account? <Link to="/login">Login</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainSignUp;
// MainSignUp.js
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import Lottie from 'lottie-react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import HeadAnim from '../../../assests/HeadAnimation.json';
import './MainSignUp.css';

const MainSignUp = () => {
  const [form] = Form.useForm();
  const [role, setRole] = useState('student'); // Default role is student

  const inputStyle = {
    borderColor: '#D1AEF9',
    color: '#8230C6',
    backgroundColor: '#f0f2f5',
  };

  const handleSignUp = (values) => {
    console.log('Received values:', values);
    // You can add your sign-up logic here
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
