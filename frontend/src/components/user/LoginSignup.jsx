import React, { useState, useRef, useEffect } from 'react';
import Loader from '../layout/Loader/Loader.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userAction.js';
import { useAlert } from 'react-alert';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  // Retrieve state from Redux store
  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/logo.png');

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const loginSubmit = e => {
    e.preventDefault();
    console.log('Login form submitted');
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = e => {
    e.preventDefault();
    console.log('Register form submitted');
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.append('avatar', avatar);
    // Dispatch the register action here
  };

  const registerDataChange = e => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]); // Correctly set the file
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate('/account');
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('translate-x-0');
      switcherTab.current.classList.remove('translate-x-full');
      registerTab.current.classList.add('hidden');
      loginTab.current.classList.remove('hidden');
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('translate-x-full');
      switcherTab.current.classList.remove('translate-x-0');
      registerTab.current.classList.remove('hidden');
      loginTab.current.classList.add('hidden');
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex items-start justify-center'>
          <div className='overflow-hidden'>
            <div>
              <div className='flex justify-around'>
                <p onClick={e => switchTabs(e, 'login')}>Login</p>
                <p onClick={e => switchTabs(e, 'register')}>Register</p>
              </div>
              <button
                className='bg-green-500 h-[2px] w-1/2 transform transition-transform duration-300'
                ref={switcherTab}
              ></button>
            </div>
            <form
              className='flex flex-col items-start p-4'
              ref={loginTab}
              onSubmit={loginSubmit}
            >
              <div>
                <input
                  className='input input-bordered flex items-center gap-2'
                  type='email'
                  placeholder='Email'
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  className='input input-bordered flex items-center gap-2'
                  type='password'
                  value={loginPassword}
                  placeholder='Password'
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Link
                className='mx-2 text-zinc-400 text-sm'
                to='/password/forgot'
              >
                Forgot password?
              </Link>
              <input
                className='w-full mt-4 py-2 rounded bg-green-500 text-sm text-white'
                value='Login'
                type='submit'
              />
            </form>
            <form
              className='flex flex-col items-start p-4 hidden'
              ref={registerTab}
              encType='multipart/form-data'
              onSubmit={registerSubmit}
            >
              <div>
                <input
                  className='input input-bordered flex items-center gap-2'
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={name}
                  onChange={registerDataChange}
                  required
                />
              </div>
              <div>
                <input
                  className='input input-bordered flex items-center gap-2'
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={registerDataChange}
                  required
                />
              </div>
              <div>
                <input
                  className='input input-bordered flex items-center gap-2'
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={registerDataChange}
                  required
                />
              </div>
              <div>
                <img
                  src={avatarPreview}
                  alt='Avatar Preview'
                />
                <input
                  className='file-input file-input-bordered w-full max-w-xs'
                  type='file'
                  name='avatar'
                  accept='image/*'
                  onChange={registerDataChange}
                />
              </div>
              <input
                className='w-full mt-4 py-2 rounded bg-green-500 text-sm text-white'
                value='Register'
                type='submit'
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
