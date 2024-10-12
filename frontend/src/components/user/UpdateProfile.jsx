import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  updateProfile,
  loadUser
} from '../../actions/userAction.js';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Spin,
  Typography,
  Row,
  Col
} from 'antd';
import { UserOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const { Title } = Typography;

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { error, isUpdated, loading } = useSelector(state => state.profile);

  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email
      });
      setAvatarPreview(user.avatar[0] ? user.avatar[0].url : '/Profile.png');
    }
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      message.success('Profile Updated Successfully');
      dispatch(loadUser());
      navigate('/account');
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, navigate, user, isUpdated, form]);

  const handleUpdate = values => {
    const myForm = new FormData();
    myForm.set('name', values.name);
    myForm.set('email', values.email);
    if (avatar) {
      myForm.set('avatar', avatar[0].url);
    }
    dispatch(updateProfile(myForm));
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        backgroundColor: '#fff'
      }}
    >
      <Title
        level={2}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        Update Profile
      </Title>
      <Form
        form={form}
        onFinish={handleUpdate}
        layout='vertical'
        style={{ marginTop: '20px' }}
      >
        <Row gutter={16}>
          <Col
            span={24}
            style={{ textAlign: 'center' }}
          >
            <Form.Item>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={user.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '20px'
                  }}
                />
              ) : (
                <Spin size='large' />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder='Name'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder='Email'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%', padding: '10px 0' }}
                loading={loading}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateProfile;