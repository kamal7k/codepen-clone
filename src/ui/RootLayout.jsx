import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick={true}
        pauseOnHover={false}
      />
    </>
  )
}

export default RootLayout