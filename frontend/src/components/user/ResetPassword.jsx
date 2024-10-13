import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Typography, Row, Col } from 'antd';
import { KeyOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants.js';
import { clearErrors, updatePassword } from '../../actions/userAction.js';
import MetaData from '../layout/MetaData.jsx';

const ResetPassword = () => {
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
          backgroundColor: '#fff'
        }}
      >
        <Title
          level={2}
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
          Update Password
        </Title>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout='vertical'
          style={{ marginTop: '20px' }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='oldPassword'
                rules={[
                  { required: true, message: 'Please enter your old password!' }
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined />}
                  placeholder='Old Password'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='newPassword'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your new password!'
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters long'
                  }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='New Password'
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
                    message: 'Please confirm your new password!'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The two passwords do not match!')
                      );
                    }
                  })
                ]}
              >
                <Input.Password
                  prefix={<UnlockOutlined />}
                  placeholder='Confirm Password'
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
                  Update Password
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
