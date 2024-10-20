import React from 'react';

import {
  UserOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  DashboardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction.js'; // Import your logout action

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuClick = e => {
    console.log('click', e);
    const selectedItem = items.find(item => item.key === e.key);
    if (selectedItem && selectedItem.func) {
      selectedItem.func();
    }
  };

  const dashboard = () => {
    navigate('/dashboard');
  };

  const orders = () => {
    navigate('/orders');
  };

  const account = () => {
    navigate('/account');
  };

  const logoutUser = () => {
    dispatch(logout());
    message.success('Logout successful');
  };

  let items = [
    {
      label: 'Orders',
      key: '1',
      icon: <ShoppingCartOutlined />,
      func: orders
    },
    {
      label: 'Profile',
      key: '2',
      icon: <ProfileOutlined />,
      func: account
    },
    {
      label: 'Logout',
      key: '3',
      icon: <LogoutOutlined />,
      func: logoutUser
    }
  ];

  if (user.role === 'admin') {
    items.unshift({
      label: 'Dashboard',
      key: '4',
      icon: <DashboardOutlined />,
      func: dashboard
    });
  }

  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  // console.log(user)

  return (
    <Space wrap>
      <Dropdown
        menu={menuProps}
        placement='bottomRight'
      >
        <Avatar
          src={
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
            />
          }
        />
      </Dropdown>
    </Space>
  );
};

export default UserOptions;
