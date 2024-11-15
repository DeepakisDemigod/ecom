import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import { useParams, Link } from 'react-router-dom';
import {
  Layout,
  Typography,
  Slider,
  Card,
  Row,
  Col,
  Tag,
  Empty,
  Pagination,
  Spin,
  Button,
  message
} from 'antd';
import { ShoppingOutlined, ClearOutlined } from '@ant-design/icons';
import MetaData from '../layout/MetaData.jsx';

const { Content } = Layout;
const { Title, Text } = Typography;

const categories = ['Graphics', 'Game', 'Phone', 'Accessories'];

const Products = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount
  } = useSelector(state => state.products);

  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      messageApi.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    error,
    messageApi
  ]);

  const handlePriceChange = value => {
    setPrice(value);
  };

  const handleRatingChange = value => {
    setRatings(value);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setPrice([0, 25000]);
    setCategory('');
    setRatings(0);
    setCurrentPage(1);
  };

  return (
    <Layout>
      {contextHolder}
      <MetaData title='Ecommerce Products' />
      <Content style={{ padding: '0 50px', marginTop: 0 }}>
        <Title
          level={2}
          style={{ textAlign: 'center', margin: '20px 0' }}
        >Games</Title>

        <Row gutter={[24, 24]}>
          <Col
            xs={24}
            sm={24}
            md={6}
            lg={6}
          >
            <Card
              title='Filters'
              style={{ marginBottom: 20 }}
              extra={
                <Button
                  icon={<ClearOutlined />}
                  onClick={clearFilters}
                  type='link'
                >
                  Clear
                </Button>
              }
            >
              <div style={{ marginBottom: 20 }}>
                <Text strong>Price Range</Text>
                <Slider
                  range
                  min={0}
                  max={25000}
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <Text strong>Categories /Genre</Text>
                <div style={{ marginTop: 10 }}>
                  {categories.map(cat => (
                    <Tag
                      key={cat}
                      color={category === cat ? 'green' : 'default'}
                      style={{ marginBottom: 5, cursor: 'pointer' }}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Tag>
                  ))}
                </div>
              </div>

              <div>
                <Text strong>Ratings Above</Text>
                <Slider
                  min={0}
                  max={5}
                  value={ratings}
                  onChange={handleRatingChange}
                />
              </div>
            </Card>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={18}
            lg={18}
          >
            <Spin spinning={loading}>
              {products && products.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {products.map(product => (
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      key={product._id}
                    >
                      <Link to={`/product/${product._id}`}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={product.name}
                              src={product.images[0].url}
                              style={{ height: 200, objectFit: 'cover' }}
                            />
                          }
                          actions={[<ShoppingOutlined key='shop' />]}
                        >
                          <Card.Meta
                            title={product.name}
                            description={
                              <>
                                <Text strong>₹{product.price}</Text>
                                <br />
                                <Text type='secondary'>
                                  Rating: {product.ratings} / 5
                                </Text>
                              </>
                            }
                          />
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty description='No products found' />
              )}
            </Spin>

            {resultPerPage < filteredProductsCount && (
              <Pagination
                current={currentPage}
                total={productsCount}
                pageSize={resultPerPage}
                onChange={handlePageChange}
                style={{ marginTop: 20, textAlign: 'center' }}
              />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Products;
