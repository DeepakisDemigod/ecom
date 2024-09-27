import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Rate, Space } from 'antd';

const { Meta } = Card;
const { Text, Title } = Typography;

const ProductCard = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(product.price);

  return (
 //   <Link
   //   to={`/product/${product._id}`}
   //   style={{ textDecoration: 'none' }}  >
      <Card
        hoverable
        cover={
          <img
            alt={product.name}
            src={product.images[0].url}
            style={{
              objectFit: 'cover',
              height: '160px',
              width: '100%'
            }}
          />
        }
        style={{ width: 180, marginBottom: 16 }}
      >
        <Meta
          title={
            <Title
              level={5}
              ellipsis={{ rows: 1 }}
            >
              {product.name}
            </Title>
          }
          description={
            <Space
              direction='vertical'
              size='small'
              style={{ width: '100%' }}
            >
              <Space>
                <Rate
                  disabled
                  defaultValue={product.ratings}
                  allowHalf
                  style={{ color: 'royalblue' }}
                />
                <Text
                  type='secondary'
                  style={{ fontSize: 10 }}
                >
                  ({product.numOfReviews})
                </Text>
              </Space>
              <Text style={{ fontSize: 12 }}>
                Category: <Text strong>{product.category}</Text>
              </Text>
              <Title
                level={5}
                type='success'
                style={{ marginTop: 0, marginBottom: 0 }}
              >
                {formattedPrice}
              </Title>
            </Space>
          }
        />
      </Card>
    //</Link>
  );
};

export default ProductCard;
