import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, Avatar } from 'antd';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { useRouter } from 'next/router';
import { UploadOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import Image from 'next/image'
import { useUser } from '../context/userContext';
import Cookies from 'js-cookie';

function ProfileForm() {

  const userCookie=Cookies.get("loggedIn");
console.log("cookie",userCookie)
  const {user} = useUser();
  const[email,setEmail]=useState(user.user_email)
console.log("userrr",user);
console.log(user.name, " And " , user.user_email)
  const auth = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id:user.user_id,
    key:"Vx0cbjkzfQpyTObY8vfqgN1us",
    full_name:user.full_name,
    email:user.user_email,
    phone:user.user_phone,
    pmdc_number:'',
    city_id:'',
  });
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFinish =async () => {
    console.log(user.user_id)

    console.log(formData);

    try {
      const response = await axios.post('/api/update', formData);
      console.log(response)
      if (response.status === 200 ) {
        auth.login(response);
        message.success('update profile successfully');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        message.error('profile Not updated');
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="flex flex-col px-6 py-5 rounded-md shadow-sm w-[440px] border border-[#00000030]">
      <h2 className="font-[600] text-[24px]">Update Profile</h2>
      <Form
        name="profileForm"
        onFinish={onFinish}
        style={{ marginTop: '20px' }}
        layout="vertical"
        initialValues={formData}
      >
        <Form.Item label="Full Name" className="text-[#777777] mb-2" name="fullName">
          <Input
            placeholder="Full Name"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.full_name}
            onChange={(e)=>setFormData({...formData,full_name:e.target.value})}
          />
        </Form.Item>

        <Form.Item label="Email Address" className="text-[#777777] mb-2" name="email">
          <Input
            placeholder="Email Address"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.email}
           disabled
          />
        </Form.Item>

        <Form.Item label="Phone Number" className="text-[#777777] mb-2" name="phone">
          <Input
            placeholder="Phone Number"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.phone}
            onChange={(e)=>setFormData({...formData,phone:e.target.value})}
          />
        </Form.Item>

    
          <Form.Item label="PMDC" className="text-[#777777] mb-2" name="pmdc">
            <Input
              placeholder="PMDC"
              className="border border-[#0000000F] py-2 px-3"
              value={formData.pmdc_number}
              onChange={(e)=>setFormData({...formData,pmdc_number:e.target.value})}
              />
          </Form.Item>

        <Form.Item label="City" className="text-[#777777] mb-2" name="city">
          <Input
            placeholder="City"
            className="border border-[#0000000F] py-2 px-3"
            value={formData.city_id}
            onChange={(e)=>setFormData({...formData,city_id:e.target.value})}
          />
        </Form.Item>

        <Form.Item>
          <Button className="bg-[#3F93FF] update-btn py-5 mt-4 flex w-full items-center justify-center text-white hover:text-white" block htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProfileForm;
