import {createContext, useEffect, useState} from 'react';

import {createTheme} from '@mui/material';

export const UserContext = createContext();
export function UserProvider({children}) {
  //Add all the stuff we will keep in context below

  const [pageTitle, setPageTitle] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    accessToken: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    createdDate: null,
    id: null,
  });

  const checkSession = async () => {
    if (sessionStorage.getItem('access') !== null) {
      const sessionAccess = await sessionStorage.getItem('access');
      const role = await sessionStorage.getItem('role');
      const id = await sessionStorage.getItem('id');
      await setUser({...user, accessToken: sessionAccess, role: role, id: id});
    }
  };

  const logout = () => {
    console.log('logout function');
    sessionStorage.clear('access');
    sessionStorage.clear('role');
    setUser({
      accessToken: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
      createdDate: null,
      id: null,
    });
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
    checkSession,
  };

  //return the context provider below using thew value object above

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
