// UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();



export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  // Function to update user data
  const updateUser = (newData) => {
    console.log("heeeeeeeeeeeeee  "+newData.user_id)
    setUser(newData);
  };
  

  return (
    <UserContext.Provider value={{ user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}