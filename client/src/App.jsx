import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import AdminLayout from './layout/AdminLayout.jsx'

import { Toaster } from 'react-hot-toast'
import Home from './pages/Home.jsx'
import ScrollUp from './components/ScrollUp.jsx'

import AOS from 'aos'
import 'aos/dist/aos.css'
import AboutUs from './pages/AboutUs.jsx'
import Careers from './pages/Careers.jsx'
import JobDetails from './components/JobDetails.jsx'

import ServicePage from './pages/ServicePage.jsx'
import Blogs from './pages/Blogs.jsx'
import BlogDetails from './pages/BlogDetails.jsx'

import PageNotFound from "./pages/PageNotFound.jsx";
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import AdminLogin from './pages/Admin/AdminLogin.jsx'

import { adminRoutes } from './routes/adminRoutes.jsx'


const App = () => {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      mirror: false,
      offset: 80,
    });
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100)
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/careers' element={<Careers />} />
          <Route path="/careers/:slug" element={<JobDetails />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path="/services/:serviceSlug" element={<ServicePage />} />
          <Route path='/blogs/:slug' element={<BlogDetails />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>

            {adminRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}

            <Route index element={<AdminDashboard />} />

          </Route>
        </Route>


        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ScrollUp />
    </div>
  )
}

export default App