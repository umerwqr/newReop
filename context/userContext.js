// UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  // Function to update user data
  const updateUser = (newData) => {
    setUser([...user, newData]);
  };
  

  return (
    <UserContext.Provider value={{ user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
}