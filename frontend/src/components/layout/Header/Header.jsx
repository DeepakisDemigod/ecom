import React from 'react';

const Header = () => {
  return (
    <div className='drawer'>
      <input
        id='my-drawer-3'
        type='checkbox'
        className='drawer-toggle'
      />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div className='navbar bg-base-100 w-full'>
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='my-drawer-3'
              aria-label='open sidebar'
              className='btn btn-square btn-ghost'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-6 w-6 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </label>
          </div>
          <div className='mx-2 flex-1 px-2'>
            <a
              href='/'
              className='text-xl'
            >
              BackInGame
            </a>
          </div>
          <div className='z-[100] hidden flex-none lg:block'>
            <ul className='menu menu-horizontal'>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/products'>Products</a>
              </li>
              <li>
                <a href='/contact'>Contact</a>
              </li>
              <li>
                <a href='/about'>About</a>
              </li>
            </ul>
          </div>
          <div className='form-control'>
            <a href='/search'>
              <button className='btn btn-ghost btn-circle'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </a>
          </div>
          <div className='flex-none'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle'
              >
                <div className='indicator'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  <span className='badge badge-sm indicator-item z-10'>10</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className='card card-compact dropdown-content bg-base-200 z-[1] mt-3 w-52 shadow'
              >
                <div className='card-body'>
                  <span className='text-lg font-bold'>8 Items</span>
                  <span className='text-info'>Subtotal: $999</span>
                  <div className='card-actions'>
                    <button className='btn btn-neutral'>View cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='avatar placeholder'>
                  <div className='bg-green-700 text-neutral-content w-8 rounded-full'>
                    <span className='text-xs'>DT</span>
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow'
              >
                <li>
                  <a className='justify-between'>
                    <div>
                      <span>Profile</span>
                    </div>
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-base-200 min-h-full w-80 p-4'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/products'>Products</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
