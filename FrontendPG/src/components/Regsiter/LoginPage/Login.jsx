import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import Lottie from 'lottie-react';
import HeadAnim from '../../../assests/HeadAnimation.json';
import './Login.css';
import { useAuth } from '../../../AuthContext';


const Login = () => {
  const { authenticated, userRole, login, logout } = useAuth();
  const navigate = useNavigate(); 

  const handlesignupnavigation=()=>{
    navigate('/signup');
  }
  const handleSubmit = async (values) => {
    try {
      
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username: values.username,
        password: values.password,
      });
  console.log(response);
     
      if (response.status === 200) {
        const jwtToken = response.data.token;
      console.log('JWT Token:', jwtToken);
        
        // const { username, roles, email, token } = response.data;
        const { username, roles, email , id } = response.data;
  
      
        const role = roles.includes('ROLE_GUIDE') ? 'guide' : 'student';
  
       
        // login({ username, role, email, token });
        login({ username, role, email , id});
        console.log('Login successful with id:', id);
  
       
        if (role === "guide") {
          try {
            
            const checkResponse = await axios.get(`http://localhost:8080/api/auth/guide/email/${email}`);
  
            if (checkResponse.status === 200 && checkResponse.data.exists) {
          
              navigate(`/mentorprofile`);
            } else {
           
              navigate('/signup/guide');
            }
          } catch (error) {
            console.error('Error checking email:', error);
          }
        } else if (role === "student") {
          try {
           
            const checkResponse = await axios.get(`http://localhost:8080/api/auth/student/email/${email}`);
  
            if (checkResponse.status === 200 && checkResponse.data.exists) {
             
              navigate(`/studentdashboard/${id}`);
            } else {
              
              navigate('/signup/student');
            }
          } catch (error) {
            console.error('Error checking email:', error);
          }
        }
      }
    } catch (error) {
      
      console.error('Authentication error:', error);
    }
  };
  
  
  const inputStyle = {
    borderColor: '#D1AEF9',
    color: '#8230C6',
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
            <Form onFinish={handleSubmit}>

              <Form.Item
                className='input-field'
                hasFeedback
                name="username"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    type: 'username',
                    message: 'Please input your Username!',
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

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className='remember' style={{color:'#8230C6',fontWeight:'500'}}>Remember me</Checkbox>
                </Form.Item>
                {/* <a className="login-form-forgot" href="">
                  Forgot password ?
                </a> */}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
              <span onClick={handlesignupnavigation}>
                or <a href="/signup" className='register-link'> Sign up</a>
              </span>

            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
