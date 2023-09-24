import { Layout, Button, Avatar, Menu, Dropdown, Drawer } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
const { Header } = Layout;
import { message } from 'antd'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useUser } from '../context/userContext';


function WebHeader() {
  const { user } = useUser()
  const { updateUser } = useUser();
  const userCookie = Cookies.get("user")

  const [userObject, setUserObject] = useState(null)
  console.log("iiuuuuuu", userObject)
  useEffect(() => {
    if (userCookie) {
      setUserObject(JSON.parse(userCookie))

    }
  }, [userCookie]);


  const firstname = user && userObject?.data.full_name?.split(" ")[0]
  const auth = useAuth();
  const router = useRouter();
  const { clearUserFromLocalStorage } = auth
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
    updateUser(null)
    Cookies.remove("user")

    Cookies.remove("loggedIn")
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
    <Header className="bg-red-700 px-3 h-[180px]">
      <div style={{ paddingLeft: "0px" }} className={`flex text-[16px] pt-4 px-0   text-white font-bold items-center  ${auth.isLoggedIn ? "justify-between md:px-4  " : "justify-center"} `}>
        {auth.isLoggedIn ? <>
          <Link className='hidden  lg:block custom-link' href="/items/general/mcqs/">
            <div className="hidden  lg:block xl:block cursor-pointer">
              Subjectwise Mcqs
            </div>
          </Link>
          <Link className='hidden  lg:block custom-link' href="/items/general/papers/">
            <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer">
              Past Papers
            </div>
          </Link>

          <Link className='hidden  lg:block custom-link' href="/items/general/guide/">
            <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer">
              Guidelines
            </div>
          </Link>

          <Link className='hidden  lg:block custom-link' href="/items/general/mock/">
            <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer">
              Mocks
            </div></Link>
        </> : <> </>}


        <Link href="/" className="py-3 hover:text-[#1F5689] bg-white rounded w-[90px] h-[90px] md:w-[120px] md:h-[120px] " style={{ display: "flex", justifyContent: "center", borderRadius: "70px", margin: "5px", marginBottom: "15px" }}>
          <Image src="/images/logo.svg" alt="logo" width={70} height={70} />
        </Link>
        {auth.isLoggedIn ? <>
          <Link href="/items/general/bookmarks/" className='custom-link'>

            <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer" style={{ width: "110px" }}>
              Bookmarks
            </div>
          </Link>

          <Link href="/items/general/notes/" className='custom-link'>

            <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer">
              MCQ Notes
            </div>
          </Link>

          <Link href="/items/general/card/" className='custom-link'>

            <div className="hidden sm:hidden md:hidden lg:block xl:block cursor-pointer">
              Flash Cards
            </div>
          </Link>
        </> : <> </>}



        <div className="  ml-[8px]">
          {auth.isLoggedIn ? (
            <Dropdown overlay={profileMenu} placement="bottomRight" arrow>

              <div className="py-3 rounded-full cursor-pointer ml-1 flex flex-col justify-center items-center h-18  ">

                <Image className="rounded-full" src={user && userObject?.data.profile_img_url} width={40} height={40} alt="userImage" />
                <span className='p-0 m-0 h-[27px]' style={{ display: "flex" }}>{firstname}</span>
              </div>
            </Dropdown>

          ) : (
            <>
            </>
          )}
        </div>



      </div>

      <hr className="border-2  border-white " />

    </Header>
  );
}

export default WebHeader;
