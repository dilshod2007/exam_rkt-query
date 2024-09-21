import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../auth/auth.css";

const Auth = () => {
  return (
    <>
      <div className='flex items-center justify-center min-h-screen auth'>
        <div className='max-w-[400px] flex-1 flex flex-col items-center bg-white p-8 rounded-lg shadow-lg'>
          <Link to={"/"} className='mt-8'>
          </Link>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Auth;
