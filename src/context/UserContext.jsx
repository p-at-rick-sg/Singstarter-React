import {createContext, useEffect, useState} from 'react';

export const UserContext = createContext();

export function UserProvider({children}) {
  //Add all the stuff we will keep in context below

  const [pageTitle, setPageTitle] = useState('Temp Title');
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    token: null,
  });

  const logout = () => {
    console.log('logout function');
  };

  //here  are the items we will pass to the context
  const value = {
    pageTitle,
    setPageTitle,
    authenticated,
    setAuthenticated,
    user,
    setUser,
    logout,
  };

  //return the context provider below using thew value object above

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
