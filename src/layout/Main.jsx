import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='max-w-6xl mx-auto'>
           
           <Navbar></Navbar>
           <Outlet></Outlet>
        </div>
    );
};

export default Main;