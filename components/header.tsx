import React from 'react';
import NavbarModuleLoggedOut from './NavbarLoggedOut';
import NavbarModuleLoggedIn from './NavbarLoggedIn';
import { useUser } from '../context/UserContext';

export default function Header() {
  const { user } = useUser();
  const isLoggedIn = Boolean(user);

  return (
    <>
      {isLoggedIn ? <NavbarModuleLoggedIn /> : <NavbarModuleLoggedOut />}
    </>
  );
}
