import React from 'react';
import { Card, Avatar, Rate, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const ReviewCard = ({ review }) => {
  return (
    <Card
      className='review-card'
      style={{
        padding: '16px',
        width: '100%',
        maxWidth: '300px',
        marginBottom: '16px'
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
      >
        <Avatar
          size='small'
          icon={<UserOutlined />}
          src={review.avatar || undefined}
          style={{ marginRight: '8px' }}
        />
        <Text strong>{review.name}</Text>
      </div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
      >
        <Rate
          allowHalf
          defaultValue={review.rating}
          disabled
          style={{ fontSize: '14px', marginRight: '8px' }}
        />
        <Text
          type='secondary'
          style={{ fontSize: '12px' }}
        >
          {review.rating.toFixed(1)}
        </Text>
      </div>
      <Paragraph
        ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
        style={{ fontSize: '14px', margin: 0 }}
      >
        {review.comment}
      </Paragraph>
    </Card>
  );
};

export default ReviewCard;
