import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Typography, Row, Col } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants.js';
import { clearErrors, resetPassword } from '../../actions/userAction.js';
import MetaData from '../layout/MetaData.jsx';

const { Title } = Typography;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  
  const { error, success, loading } = useSelector((state) => state.forgotPassword);
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      message.success('Password Updated Successfully');
      navigate('/login');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const handleUpdate = () => {
    const myForm = new FormData();
    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  return (
    <>
      <MetaData title='Reset Password' />
      <div
        style={{
          maxWidth: '600px',
          margin: '50px auto',
          padding: '20px',
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Reset Password
        </Title>
        <Form
          form={form}
          onFinish={handleUpdate}
          layout='vertical'
          style={{ marginTop: '20px' }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='newPassword'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your new password!',
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='confirmPassword'
                dependencies={['newPassword']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The two passwords do not match!')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<UnlockOutlined />}
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
