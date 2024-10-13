import MetaData from '../layout/MetaData.jsx';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction.js';
import {
  Form,
  Input,
  Button,
  Upload,
  message as dialogue,
  Spin,
  Typography,
  Row,
  Col
} from 'antd';
import { UserOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const { Title } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { error, message, loading } = useSelector(
    state => state.forgotPassword
  );

  const [email, setEmail] = useState('');

  const forgotPasswordHandle = values => {
    const myForm = new FormData();
    myForm.set('email', values.email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      dialogue.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      dialogue.success(message);
    }
  }, [dispatch, error, message, form]);

  return (
    <>
      <MetaData title='Forgot Password' />
      <div>
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
            Forgot Password
          </Title>
          <Form
            form={form}
            onFinish={forgotPasswordHandle}
            layout='vertical'
            style={{ marginTop: '20px' }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name='email'
                  label='Email'
                  rules={[
                    { required: true, message: 'Please input your email!' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
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
                    Send
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
