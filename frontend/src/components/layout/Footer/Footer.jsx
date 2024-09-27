import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { TwitterOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
    { label: 'Contact', link: '/contact' },
    { label: 'Login', link: '/login' },
  ];

  return (
    <AntFooter style={{ background: '#fff', padding: '40px 0' }}>
      <div className="container mx-auto px-4">
        <Row gutter={[32, 32]} justify="space-between" align="top">
          <Col xs={24} sm={12} md={8} lg={8}>
            <Space direction="vertical" size="large">
              <img src='/logo.png' alt='Game Store Logo' style={{ height: '40px' }} />
              <Text>
                Games made affordable to everyone. Shop now for exclusive deals on your favorite games.
              </Text>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Title level={4} style={{ marginBottom: '20px' }}>Quick Links</Title>
            <Space direction="vertical">
              {menuItems.map((item, index) => (
                <Link key={index} to={item.link}>
                  {item.label}
                </Link>
              ))}
            </Space>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Title level={4} style={{ marginBottom: '20px' }}>Connect With Us</Title>
            <Space size="large">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined style={{ fontSize: '24px', color: '#1DA1F2' }} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <YoutubeOutlined style={{ fontSize: '24px', color: '#FF0000' }} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={{ fontSize: '24px', color: '#1877F2' }} />
              </a>
            </Space>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '40px' }}>
          <Col>
            <Text type="secondary">
              © 2024 Game Store. All rights reserved.
            </Text>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;