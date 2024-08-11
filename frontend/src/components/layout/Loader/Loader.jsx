import React from 'react';

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <span className='loading loading-spinner text-green-500 loading-lg'></span>
    </div>
  );
};

export default Loader;
