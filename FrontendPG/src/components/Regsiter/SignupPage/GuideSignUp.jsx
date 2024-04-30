import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Row, Col, Select, Checkbox } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../../../AuthContext';
import Lottie from 'lottie-react';
import HeadAnim from '../../../assests/HeadAnimation.json';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './GuideSignUp.css';

const { Option } = Select;

const GuideSignUp = () => {
  const navigate= useNavigate();
  const {useremail}=useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const onFinish =async  (values) => {
    console.log(values);
     setLoading(true); 

    try {
    
      const formData = new FormData();
      formData.append('file', imageFile);

     
      const fileResponse = await axios.post('http://localhost:8080/api/auth/files/upload', formData);
      const imageUrl = fileResponse.data; 


      const payload = {
        email:useremail,
        name: values.name,
        guideId: values.guide_id,
        gender: values.gender,
        phoneNumber: values.phoneNumber,
        academicQualification: values.Academic,
        yearOfExperience:values.year,
        areaOfSpecialization:values.area,
        image: imageUrl 
      };

      const response = await axios.post('http://localhost:8080/api/auth/guide/addGuide', payload);

      console.log('Student saved:', response.data);
      navigate('/mentorprofile');
      setLoading(false); 
    } catch (error) {

      console.error('Error saving student:', error);
      setLoading(false); 
      message.error('Failed to save guide. Please try again later.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const uploadProps = {
    maxCount: 1,
    beforeUpload: () => false,
  };

  const inputStyle = {
    borderColor: '#D1AEF9',
    color:'#8230C6',
    backgroundColor: '#f0f2f5',
  };

  return (
    <>
    <div className="sign-main">
      
      <div className="sign-left">
        <div className="anim-div">
      <Lottie animationData={HeadAnim}/>
        </div>
      </div>

      <div className="sign-right">
      <div className="signup-form">
      <h2>Sign Up for Guide</h2>
      <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input prefix={<UserOutlined />} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
          <Form.Item
                    label="Upload Image :"
                    name="image"
                    rules={[{ required: true, message: 'Please upload your image!' }]}
                  >
                    <input type="file" accept="image/*" onChange={handleImageChange}
                    style={{marginTop : '-10px', borderColor: '#D1AEF9',size:'10px'}} />
                  </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} >
            <Form.Item
              label="Guide Id"
              name="guide_id"
              rules={[
                { required: true, message: 'Please input your id!' },
                // { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input  style={inputStyle}/>
            </Form.Item>
          </Col>
          
          
          <Col xs={24} sm={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select your gender!' }]}
            >
              <Select placeholder="Select gender" >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input  style={inputStyle}  />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Academic Qualification"
              name="Academic"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input  style={inputStyle}  />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Year of Experience"
              name="year"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input  style={inputStyle}  />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Area of Specialization"
              name="area"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input  style={inputStyle}  />
            </Form.Item>
          </Col>

          
          <Col xs={24} sm={12}>
            <Form.Item
              name="acceptPolicies"
              valuePropName="checked"
              rules={[
                { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please accept the policies') }
              ]}
            >
              <Checkbox style={{color:'#8230C6',fontWeight:'500'}}>I agree to the Terms & Condition</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{width:'100%',backgroundColor: '#8230C6'}}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
      </div>

    

  </div>
    
    </>
  );
};

export default GuideSignUp;
