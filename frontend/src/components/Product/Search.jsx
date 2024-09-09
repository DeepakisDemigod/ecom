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
    <div className='bg-base-100 text-xs flex justify-center items-center h-[70vh]'>
      <form
        onSubmit={searchSubmitHandler}
        className='form-control bg-base-100 p-8   shadow-lg max-w-md w-full'
      >
        <h2 className='text-xl font-semibold mb-6 text-center'>
          Search for a Product
        </h2>
        <div className='flex h-10 '>
          {/*<input
            type='text'
            placeholder='Search a product...'
            onChange={e => setKeyword(e.target.value)}
            className='h-11 flex-[0.9] bg-base-200 w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <input
            type='submit'
            value='Search'
            className='flex-[0.1] w-full p-1 bg-green-600 text-white hover:bg-green-700 cursor-pointer'
          />*/}
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='grow'
              onChange={e => setKeyword(e.target.value)}
              placeholder='gta'
              list='products'
            />
            <datalist id='products'>
              <option value='gta'></option>
              <option value='residence evil'></option>
              <option value='zoo tycoon'></option>
              <option value='ghost of tsushima'></option>
              <option value='nvidia rtx3090'></option>
            </datalist>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path
                fillRule='evenodd'
                d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                clipRule='evenodd'
              />
            </svg>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Search;
