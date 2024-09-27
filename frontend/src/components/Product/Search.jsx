import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Form, Card, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MetaData from '../layout/MetaData.jsx';


const { Title, Paragraph } = Typography;

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = (values) => {
    if (values.keyword.trim()) {
      navigate(`/products/${values.keyword}`);
    } else {
      navigate('/products');
    }
  };

  const suggestedProducts = ['gta', 'residence evil', 'zoo tycoon', 'ghost of tsushima', 'nvidia rtx3090'];

  return (
    <>
      <MetaData title="Search Exciting New Games and Consoles" />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '20px' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Form onFinish={searchSubmitHandler}>
          <Title level={4}>Search for a Product</Title>
          <Form.Item name="keyword" rules={[{ required: true, message: 'Please enter a search keyword' }]}>
            <Input
              placeholder="Search a product..."
              prefix={<SearchOutlined />}
              onChange={(e) => setKeyword(e.target.value)}
              list="products"
            />
          </Form.Item>
          <datalist id="products">
            {suggestedProducts.map((product) => (
              <option key={product} value={product} />
            ))}
          </datalist>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              style={{ width: '100%' }}
            >
              Search
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Paragraph>Suggested:</Paragraph>
          <Space size={[0, 8]} wrap>
            {suggestedProducts.map((product) => (
              <Tag key={product} color="green" style={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${product}`)}>
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