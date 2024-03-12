import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Row, Col, Select, Checkbox } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

import './Signup.css';

const { Option } = Select;

const GuideSignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // You can handle form submission here, e.g., send data to server
    console.log('Received values:', values);
    setTimeout(() => {
      setLoading(false);
      message.success('Registration successful!');
      form.resetFields();
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const uploadProps = {
    maxCount: 1,
    beforeUpload: () => false,
  };

  const inputStyle = {
    borderColor: '#1890ff',
    backgroundColor: '#f0f2f5',
  };

  return (
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
              label="Upload Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => [e.file]}
              rules={[{ required: true, message: 'Please upload your image!' }]}
            >
              <Upload {...uploadProps} accept="image/*" listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} >
            <Form.Item
              label="Guide Id"
              name="guide-id"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input  style={inputStyle}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password  style={inputStyle}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password  style={inputStyle}/>
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
              label="No of Student Mentored"
              name="no-student"
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
              <Checkbox>I agree to the Terms & Condition</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{width:'100%'}}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GuideSignUp;
