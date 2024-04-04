import {createContext, useEffect, useState} from 'react';
import {createTheme} from '@mui/material';

export const UserContext = createContext();
export function UserProvider({children}) {
  //Add all the stuff we will keep in context below

  const [pageTitle, setPageTitle] = useState('Temp Title');
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    accessToken: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    createdDate: null,
  });

  const checkSession = async () => {
    console.log('checking session: ', sessionStorage.getItem('role'));
    if (sessionStorage.getItem('access') !== null) {
      const sessionAccess = await sessionStorage.getItem('access');
      const role = await sessionStorage.getItem('role');
      await setUser({...user, accessToken: sessionAccess, role: role});
      if (role === 'user') navigate('/');
    }
  };

  const logout = () => {
    console.log('logout function');
    sessionStorage.clear('access');
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
