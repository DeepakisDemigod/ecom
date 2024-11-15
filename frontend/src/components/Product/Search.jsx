import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Typography,
  Form,
  Card,
  Space,
  Tag,
  Divider
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MetaData from '../layout/MetaData.jsx';

const { Title, Paragraph } = Typography;

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = values => {
    if (values.keyword.trim()) {
      navigate(`/products/${values.keyword}`);
    } else {
      navigate('/products');
    }
  };

  const suggestedProducts = [
    'gta',
    'resident evil',
    'zoo tycoon',
    'ghost of tsushima',
    'nvidia rtx3090'
  ];

  return (
    <>
      <MetaData title='Search Exciting New Games and Consoles' />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          padding: '20px',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: 480,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Title
            level={4}
            style={{ textAlign: 'center', marginBottom: 16 }}
          >
            Search for a Product
          </Title>
          <Form
            onFinish={searchSubmitHandler}
            layout='vertical'
          >
            <Form.Item
              name='keyword'
              rules={[
                { required: true, message: 'Please enter a search keyword' }
              ]}
            >
              <Input
                placeholder='Search a product...'
                prefix={<SearchOutlined />}
                onChange={e => setKeyword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                icon={<SearchOutlined />}
                style={{ width: '100%' }}
              >
                Search
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <div>
            <Paragraph style={{ marginBottom: 8, fontWeight: 'bold' }}>
              Suggested:
            </Paragraph>
            <Space wrap>
              {suggestedProducts.map(product => (
                <Tag
                  key={product}
                  color='green'
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/products/${product}`)}
                >
                  {product}
                </Tag>
              ))}
            </Space>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Search;
