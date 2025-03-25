import React, { useContext, useEffect } from 'react';
import UserContext from './usercontext';

function UserContextProvider({children}) {

  const [user, setUser] = useState( () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser): {};
  });

  useEffect( () => {
    //store user when it changes // from {} to {,,...},
    localStorage.setItem('user', JSON.stringify(user));
  } , [user]);

  return (
    <UserContext.Provider value={{user , setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext(){
  return useContext(UserContext);
}

export default UserContextProvider