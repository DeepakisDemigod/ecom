import React from 'react';
import { Layout, Menu, Button, Avatar, Badge, Dropdown, Drawer, Space, Typography } from 'antd';
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

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: <Link to="/"><Space><HomeOutlined />Home</Space></Link>, key: 'home' },
    { label: <Link to="/products"><Space><ShopOutlined />Products</Space></Link>, key: 'products' },
    { label: <Link to="/contact"><Space><PhoneOutlined />Contact</Space></Link>, key: 'contact' },
    { label: <Link to="/login"><Space><LoginOutlined />Login</Space></Link>, key: 'login' },
  ];

  const cartDropdown = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div>
              <Text strong>8 Items</Text>
              <br />
              <Text type="secondary">Subtotal: $999</Text>
            </div>
          ),
        },
        {
          key: '2',
          label: <Button type="primary" block icon={<ShoppingCartOutlined />}>View Cart</Button>,
        },
      ]}
    />
  );

  const userMenu = (
    <Menu
      items={[
        { key: '1', label: <Link to="/profile"><Space>Profile <Badge count="New" /></Space></Link>, icon: <UserOutlined /> },
        { key: '2', label: <Link to="/settings">Settings</Link>, icon: <SettingOutlined /> },
        { key: '3', label: <Link to="/logout">Logout</Link>, icon: <LogoutOutlined /> },
      ]}
    />
  );

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const handleSearch = () => navigate('/search');

  return (
    <AntHeader className="sticky top-0 z-50 bg-white shadow-md p-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Space size="middle" className="lg:flex-1">
            <Button 
              className="lg:hidden" 
              type="text"
              icon={<MenuOutlined />} 
              onClick={toggleDrawer}
            />
            <Link to="/" className="flex items-center">
              {/*<img src="/logo.png" alt="logo" className="h-8" />*/}
              <Text strong className="ml-2 text-lg hidden sm:inline">BackInGame</Text>
            </Link>
          </Space>

          <Menu mode="horizontal" className="hidden lg:flex flex-1 justify-center border-0" selectedKeys={[]} items={menuItems} />

          <Space size="middle" className="lg:flex-1 justify-end">
            <Button shape="circle" icon={<SearchOutlined />} onClick={handleSearch} />
            <Dropdown menu={cartDropdown} trigger={['click']}>
              <Badge count={10} size="small">
                <Button shape="circle" icon={<ShoppingCartOutlined />} />
              </Badge>
            </Dropdown>
            <Dropdown menu={userMenu} trigger={['click']}>
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
            <Badge dot>
              <Button shape="circle" icon={<BellOutlined />} />
            </Badge>
          </Space>
        </div>
      </div>

      <Drawer 
        title="Menu" 
        placement="left" 
        onClose={toggleDrawer} 
        open={drawerVisible}
        
      >
        <Menu mode="vertical" items={menuItems} />
      </Drawer>
    </AntHeader>
  );
};

export default Header;