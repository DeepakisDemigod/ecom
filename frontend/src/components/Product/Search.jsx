import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className='bg-base-100 flex justify-center items-center h-screen'>
      <form
        onSubmit={searchSubmitHandler}
        className='form-control bg-base-100 p-8 rounded-lg shadow-lg max-w-md w-full'
      >
        <h2 className='text-2xl font-semibold mb-6 text-center'>
          Search for a Product
        </h2>
        <div className='flex h-10 '>
          <input
            type='text'
            placeholder='Search a product...'
            onChange={e => setKeyword(e.target.value)}
            className='h-11 flex-[0.9] bg-base-200 w-full p-3 mb-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <input
            type='submit'
            value='Search'
            className='flex-[0.1] w-full p-1 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 cursor-pointer'
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
