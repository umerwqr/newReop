import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';

function RegisterForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [check,setCheck]=useState(false)

  const [newUser,setNewUser]=useState({
    key:"Vx0cbjkzfQpyTObY8vfqgN1us",
    mobilenumber:'',
    fullname:'',
    email:'',
    password:'',
    rePassword:''
  })

  const onFinish = async(e) => {
    if(newUser.password !==newUser.rePassword){
       setCheck(true)
    }
    else{
      const response = await axios.post('/api/register', newUser);
        console.log(response)
      if(response.status===200){
        setTimeout(() => {
          router.push('/');
        }, 2000);
        console.log(response)
        message.success('Registration successful');
      }
    }
    
    
  };

 

  return (
    <div className="flex flex-col text-center px-6 py-5 rounded-md shadow-sm w-[470px] border border-[#00000030]">
      <h2 className="font-[600] text-[24px]">Register</h2>
      <p className="font-[400] text-[18px]">Please register to continue.</p>
      
      <Form
        name="registerForm"
        onFinish={onFinish}
        form={form}
        style={{ marginTop: '20px' }}
        layout="vertical"
      >
        <Form.Item 
        label="Full Name" 
        className="text-[#777777] mb-2" 
        name="fullName">
          <Input 
          value={newUser.fullname}
          onChange={(e)=>setNewUser({ ...newUser,fullname:e.target.value})}
          placeholder="Enter your full name" 
          className="border border-[#0000000F] py-2 px-3" />
        </Form.Item>

        <Form.Item 
        label="Email Address" 
        className="text-[#777777] mb-2" 
        name="email">
          <Input 
          value={newUser.email}
          onChange={(e)=>setNewUser({...newUser,email:e.target.value})}
          placeholder="Enter your email" 
          className="border border-[#0000000F] py-2 px-3" />
        </Form.Item>

        <Form.Item 
        label="Phone Number" 
        className="text-[#777777] mb-2" 
        name="phoneNumber">
          <Input 
          value={newUser.mobilenumber}
          onChange={(e)=>setNewUser({...newUser,mobilenumber:e.target.value})}
          placeholder="Enter your phone number" 
          className="border border-[#0000000F] py-2 px-3" />
        </Form.Item>

        <Form.Item 
        label="Create Password" 
        className="text-[#777777] mb-2" 
        name="password" 
        rules={[{ required: true, message: 'Please enter a password' }]}>
          <Input.Password 
          value={newUser.password}
          placeholder="Enter your password" 
          className="border border-[#0000000F] py-2 px-3" 
          onChange={(e)=>setNewUser({...newUser,password:e.target.value})} />
        </Form.Item>

        <Form.Item 
        label="Re-enter Password" 
        className="text-[#777777] mb-2" 
        name="rePassword" 
        rules={[{ required: true, message: 'Please Re Enter your password' }]}>
          <Input.Password 
          value={newUser.rePassword}
          placeholder="Re Enter your password" 
          className="border border-[#0000000F] py-2 px-3" 
          onChange={(e)=>setNewUser({...newUser,rePassword:e.target.value})} />
        </Form.Item>
         {check? (
          <p style={{color:"red"}}>
            password and Re Password are not same

          </p>
         ):(
          <p>

          </p>
         )}

        <Form.Item className="my-5">
          <Button className="bg-[#3F93FF] register-btn py-5  flex w-full items-center justify-center text-white hover:text-white" block htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterForm;
