import {createContext, useEffect} from 'react';
import {createTheme} from '@mui/material';

export const UserContext = createContext();
const userTheme = createTheme();

export function UserProvider({children}) {
  //Add all the stuff we will keep in context below
  const logout = () => {
    console.log('logout function');
  };

  const value = {
    userTheme,
    logout,
  };

  //return the context provider below using thew value object above

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
