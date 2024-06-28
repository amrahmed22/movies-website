import React from 'react';
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';

const Layout = ({ userData, setUserData }) => {
    function logOut() {
        localStorage.removeItem('userToken');
        setUserData(null)


    }
    return <>
        <Navbar userData={userData} logOut={logOut} />
        <div className="">
            <Outlet></Outlet>
        </div>
        <Footer />
    </>
}
export default Layout;
