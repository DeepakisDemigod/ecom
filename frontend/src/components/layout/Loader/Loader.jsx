import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const Loader = () => {
  return (
    <div className='w-[100vw] h-[70vh] flex items-center justify-center'>
      <Flex
        align='center'
        gap='middle'
      >
        <Spin
    size="large"
        />
      </Flex>
    </div>
  );
};

export default Loader;
