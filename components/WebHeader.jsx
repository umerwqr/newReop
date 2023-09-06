import { Layout, Button, Avatar, Menu, Dropdown, Drawer } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider'; 
const { Header } = Layout;
import {message} from 'antd'
import { useRouter } from 'next/router';

function WebHeader() {
  const auth = useAuth(); 
  const router = useRouter();
  const {clearUserFromLocalStorage} = auth
  console.log(auth.user?.firstName)

  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const LogOut = () => {
    clearUserFromLocalStorage();
    setTimeout(() => {
      message.info("You have been logged out!");
    }, 2000);

    router.push("/")

  }

  const profileMenu = (
    <Menu>
      <Menu.Item key="User"><Link href="/UserProfile">Profile</Link></Menu.Item>
      <Menu.Item key="logout" className="menu" onClick={LogOut}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white px-3 md:px-[3.5rem]">
      <div className="flex sm:items-start items-center justify-between">
      <div className=" items-center hidden sm:flex">
            <Link href="/" className="mr-3"><Image src="/images/facebook.svg" width={10} height={10} alt="facebookLogo" /></Link>
            <Link href="/" className="mr-3"><Image src="/images/whatsapp.svg" width={18} height={18} alt="facebookLogo" /></Link>
            <Link href="/" className="mr-3"><Image src="/images/instagram.svg" width={18} height={18} alt="facebookLogo" /></Link>
            <Link href="/" className="font-[500]">Home</Link>
        </div>

        <Link href="/" className="py-3 hover:text-[#1F5689]">
          <Image src="/images/logo.svg" alt="logo" width={70} height={70} />
        </Link>

        <div className="hidden sm:block">
         
        <div className="hidden sm:block">
  {auth.isLoggedIn ? (
    <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
      <button className="flex items-center">
        {auth.user && auth.user.firstName} {auth.user && auth.user.lastName}
        <div  className="p-3 rounded-full ml-1">
        <Image src="/images/imageProfile.svg" width={40} height={40} alt="userImage" />
        </div>
      </button>
    </Dropdown>
  ) : (
    <Link href="/login">
      <button className="flex items-center">
        Log In
        <div className="bg-[#3F93FF1F] p-3 rounded-full ml-2">
          <Image src="/images/profile.svg" width={20} height={20} alt="login" />
        </div>
      </button>
    </Link>
  )}
</div>

      
        </div>
        <div className="block sm:hidden">
        <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '20px' }} />}
            onClick={toggleDrawer}
            className=""
          />
      </div>
      </div>
      <Drawer
        title=""
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={drawerVisible}
        key="left"
      >
        <Menu mode="vertical">
          <Menu.Item key="facebook">
            <Link href="/">
              <Image src="/images/facebook.svg" width={10} height={10} alt="facebookLogo" />
            </Link>
          </Menu.Item>
          <Menu.Item key="whatsapp">
            <Link href="/">
              <Image src="/images/whatsapp.svg" width={18} height={18} alt="whatsappLogo" />
            </Link>
          </Menu.Item>
          <Menu.Item key="instagram">
            <Link href="/">
              <Image src="/images/instagram.svg" width={18} height={18} alt="instagramLogo" />
            </Link>
          </Menu.Item>
          <Menu.Item key="home">
            <Link href="/">Home</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
}

export default WebHeader;
