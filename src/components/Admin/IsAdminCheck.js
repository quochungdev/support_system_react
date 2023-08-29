import React, { useContext } from 'react';
import { MyUserContext } from '../../App';

const IsAdminCheck = () => {
  const [user] = useContext(MyUserContext);
  const isAdmin = user && user.roleName === 'ROLE_ADMIN';
  return isAdmin;
};

export default IsAdminCheck;