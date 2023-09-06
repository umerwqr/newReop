import React from 'react';
import { useAuth } from '../context/AuthProvider'; 
import Login from './Login';
import Home from './items/Index'; 
import { UserProvider } from '../context/userContext';

export default function Index() {
  const auth = useAuth(); 
  <UserProvider>
    
  </UserProvider>
  return auth.isLoggedIn ? <Home /> : 
  <UserProvider>
     <Login />
  </UserProvider>;
}
