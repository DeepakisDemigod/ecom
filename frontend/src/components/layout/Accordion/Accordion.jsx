import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Collapse, Button, Typography, Card, Space } from 'antd';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const Accordion = () => {
  return (
    <div className='max-w-2xl mx-auto p-6'>
      {/* Header */}
      <div className='Title-center mb-8'>
        <Title level={4}>
          Got questions? <br /> We got answers!
        </Title>
      </div>

      {/* Accordion Items */}
      <Collapse>
        <Panel
          header='What is BackInGame?'
          key='1'
        >
          <Paragraph>
            It is an online shop where you can buy pre-owned games at a
            reasonable price.
          </Paragraph>
        </Panel>
        <Panel
          header='Is there an iOS/Android app?'
          key='2'
        >
          <Paragraph>
            Yes! BackInGame is available on iOS & Android phones. You can also
            sign-up here and download the app later!
          </Paragraph>
        </Panel>
        <Panel
          header='Are gaming consoles also available?'
          key='3'
        >
          <Paragraph>
            Not yet, but we are soon bringing those as well.
          </Paragraph>
        </Panel>
        <Panel
          header='The feature I want is not in the app...'
          key='4'
        >
          <Paragraph>
            Let's make it real! Submit it in the feedback box, and there's a
            chance it will be in BackInGame soon.
          </Paragraph>
        </Panel>
      </Collapse>

      {/* Enhanced Feedback Section */}
      <Card
        className='mt-12 shadow-lg'
        bordered={false}
        style={{ backgroundColor: '#f6f9fc' }}
      >
        <Space
          direction='vertical'
          size='small'
          className='w-full'
        >
          <Title
            level={4}
            className='Title-center'
          >
            we value your feedback
          </Title>
          <Paragraph className='Title-center'>
            Help us improve! Leave your feedback or suggest a new feature that
            you’d like to see in BackInGame.
          </Paragraph>
          <div className='Title-center'>
            <a href='mailto:deepakthapa1423@gmail.com'>
              <Button
                type='primary'
                size='medium'
                icon={<MailOutlined />}
                style={{
                  borderRadius: '8px',
                  padding: '0 30px'
                }}
              >
                Send Feedback
              </Button>
            </a>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Accordion;
