import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';

import ScrollToTop from '../components/ScrollToTop.jsx';

const MainLayout = () => {
    return (
        <>
            <ScrollToTop />
            <NavBar />
            <main className='min-h-screen mx-auto'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout