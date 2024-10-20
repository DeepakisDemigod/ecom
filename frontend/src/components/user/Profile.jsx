import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Descriptions,
  Button,
  Space
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  EditOutlined,
  ShoppingOutlined,
  LockOutlined
} from '@ant-design/icons';
import MetaData from '../layout/MetaData.jsx';
import Loader from '../layout/Loader/Loader.jsx';

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Row gutter={[24, 24]} justify='center'>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Card
                cover={
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <Avatar
                      size={128}
                      src={user.avatar && user.avatar[0] ? user.avatar[0].url : `https://ui-avatars.com/api/?name=${user.name}`}
                      alt={user.name}
                      icon={<UserOutlined />}
                    />
                  </div>
                }
                actions={[
                  <Button
                    type='primary'
                    icon={<EditOutlined />}
                    onClick={() => navigate('/me/update')}
                  >
                    Edit Profile
                  </Button>
                ]}
              >
                <Card.Meta
                  title={<Title level={4}>{user.name}</Title>}
                  description={<Typography.Paragraph>{user.email}</Typography.Paragraph>}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={16} lg={18}>
              <Card title='Profile Information'>
                <Descriptions layout='vertical' column={{ xs: 1, sm: 2, md: 3 }}>
                  <Descriptions.Item label='Full Name'>
                    <Space>
                      <UserOutlined />
                      {user.name}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label='Email'>
                    <Space>
                      <MailOutlined />
                      {user.email}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label='Joined on'>
                    <Space>
                      <CalendarOutlined />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
                <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                  <Col xs={24} sm={12}>
                    <Button
                      type='primary'
                      icon={<ShoppingOutlined />}
                      onClick={() => navigate('/orders')}
                      block
                    >
                      My Orders
                    </Button>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Button
                      type='primary'
                      icon={<LockOutlined />}
                      onClick={() => navigate('/password/update')}
                      block
                    >
                      Change Password
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Profile;