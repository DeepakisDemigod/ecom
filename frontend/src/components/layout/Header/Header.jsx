import React, { useEffect, useState, useMemo } from 'react';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Badge,
  Dropdown,
  Drawer,
  Space,
  Typography
} from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  HomeOutlined,
  ShopOutlined,
  PhoneOutlined,
  LoginOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../../actions/userAction';
import UserOptions from './UserOptions';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const { cartItems } = useSelector(state => state.cart);

  // Calculate total price
  const grossTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const menuItems = [
    {
      label: (
        <Link to='/'>
          <Space>
            <HomeOutlined />
            Home
          </Space>
        </Link>
      ),
      key: 'home'
    },
    {
      label: (
        <Link to='/products'>
          <Space>
            <ShopOutlined />
            Products
          </Space>
        </Link>
      ),
      key: 'products'
    },
    {
      label: (
        <Link to='/contact'>
          <Space>
            <PhoneOutlined />
            Contact
          </Space>
        </Link>
      ),
      key: 'contact'
    },
    {
      label: (
        <Link to='/login'>
          <Space>
            <LoginOutlined />
            Login
          </Space>
        </Link>
      ),
      key: 'login'
    }
  ];

  const cartDropdown = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div>
              <Text>
                <span>Quantity: </span>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </Text>
              <br />
              <Text type='secondary'>Subtotal: ₹. {grossTotal}</Text>
            </div>
          )
        },
        {
          key: '2',
          label: (
            <a href='/cart'>
              <Button
                type='primary'
                block
                icon={<ShoppingCartOutlined />}
              >
                View Cart
              </Button>
            </a>
          )
        }
      ]}
    />
  );

  const userMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Link to='/account'>
              <Space>
                Profile <Badge count='New' />
              </Space>
            </Link>
          ),
          icon: <UserOutlined />
        },
        {
          key: '2',
          label: <Link to='/settings'>Settings</Link>,
          icon: <SettingOutlined />
        },
        {
          key: '3',
          label: <Link to='/logout'>Logout</Link>,
          icon: <LogoutOutlined />
        }
      ]}
    />
  );

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const handleSearch = () => navigate('/search');

  return (
    <AntHeader className='sticky top-0 z-50 bg-white shadow-md p-0'>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex items-center justify-between h-full'>
          <Space
            size='middle'
            className='lg:flex-1'
          >
            <Button
              className='lg:hidden'
              type='text'
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
            />
            <Link
              to='/'
              className='flex items-center'
            >
              <Text
                strong
                className='ml-2 text-lg hidden sm:inline'
              >
                <img src='/logo.png' />
              </Text>
            </Link>
          </Space>

          <Menu
            mode='horizontal'
            className='hidden lg:flex flex-1 justify-center border-0'
            selectedKeys={[]}
            items={menuItems}
          />

          <Space
            size='middle'
            className='lg:flex-1 justify-end'
          >
            <Button
              shape='circle'
              icon={<SearchOutlined />}
              onClick={handleSearch}
            />
            <Dropdown
              menu={{ items: cartDropdown.props.items }}
              trigger={['click']}
            >
              <Badge
                count={10}
                size='small'
              >
                <Button
                  shape='circle'
                  icon={<ShoppingCartOutlined />}
                />
              </Badge>
            </Dropdown>
            {isAuthenticated && (
              <Dropdown
                menu={{ items: userMenu.props.items }}
                trigger={['click']}
              >
                <UserOptions user={user} />
              </Dropdown>
            )}
            <Badge dot>
              <Button
                shape='circle'
                icon={<BellOutlined />}
              />
            </Badge>
          </Space>
        </div>
      </div>

      <Drawer
        title='Menu'
        placement='left'
        onClose={toggleDrawer}
        open={drawerVisible}
      >
        <Menu
          mode='vertical'
          items={menuItems}
        />
      </Drawer>
    </AntHeader>
  );
};

export default Header;