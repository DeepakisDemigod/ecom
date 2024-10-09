import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction.js';
import { Card, Tabs, Form, Input, Button, Upload, message, Spin } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PlusOutlined
} from '@ant-design/icons';
import Loader from '../layout/Loader/Loader.jsx';
import MetaData from '../layout/MetaData.jsx';

const { TabPane } = Tabs;

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate('/account');
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  const handleLogin = values => {
    dispatch(login(values.email, values.password));
  };

  const handleRegister = values => {
    const myForm = new FormData();
    myForm.set('name', values.name);
    myForm.set('email', values.email);
    myForm.set('password', values.password);
    if (avatar) {
      myForm.set('avatar', avatar);
    }
    dispatch(register(myForm));
  };

  const handleAvatarChange = info => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      setUploading(false);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(info.file.originFileObj);
        }
      };
      reader.readAsDataURL(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      setUploading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 2000); // Simulating a 2-second upload time
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <MetaData title='Sign In to start shopping' />
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Tabs defaultActiveKey='1'>
          <TabPane
            tab='Login'
            key='1'
          >
            <Form
              form={loginForm}
              onFinish={handleLogin}
            >
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Link
                  to='/password/forgot'
                  style={{ float: 'right' }}
                >
                  Forgot password?
                </Link>
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ width: '100%' }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane
            tab='Register'
            key='2'
          >
            <Form
              form={registerForm}
              onFinish={handleRegister}
            >
              <Form.Item>
                <Upload
                  name='avatar'
                  listType='picture-circle'
                  className='avatar-uploader'
                  showUploadList={false}
                  customRequest={customUpload}
                  onChange={handleAvatarChange}
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt='Avatar'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                    />
                  ) : uploading ? (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Spin />
                    </div>
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name='name'
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder='Name'
                />
              </Form.Item>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ width: '100%' }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default LoginSignup;
