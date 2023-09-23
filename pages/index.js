import React from 'react';
import { useAuth } from '../context/AuthProvider'; 
import Login from './Login';
import Home from './items/Index'; 
import Cookie from "js-cookie"

export default function Index() {
  const auth = useAuth(); 
  const userCookie= Cookie.get("user");
    
  return auth.isLoggedIn ? <Home /> : 
     <Login />
}
