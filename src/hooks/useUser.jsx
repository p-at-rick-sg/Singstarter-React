import {UserContext} from '../context/UserContext';
import {useContext} from 'react';

export const useUser = () => {
  const context = useContext(UsereContext);

  if (context === undefined) {
    throw new Error('useUser() must be used inside a UserProvider');
  }

  return context;
};
