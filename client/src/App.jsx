import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import AdminLayout from './layout/AdminLayout.jsx'

//import { Toaster } from 'react-hot-toast'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import AdminAddBlog from './pages/Admin/AdminAddBlog.jsx'
import AdminEditBlog from './pages/Admin/AdminEditBlog.jsx'
import AdminViewBlog from './pages/Admin/AdminViewBlog.jsx';

// Admin Careers
import AdminAddCareer from './pages/Admin/AdminCareers/AdminAddCareer.jsx';
import AdminEditCareer from './pages/Admin/AdminCareers/AdminEditCareer.jsx';
import AdminViewCareer from './pages/Admin/AdminCareers/AdminViewCareer.jsx'

//
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import RefundPolicy from './pages/RefundPolicy.jsx'
import HelpCenter from './pages/helpCenterData.jsx';

//Leads
import AdminAddLeads from './pages/Admin/leads/AdminAddLead.jsx'
import AdminEditLeads from './pages/Admin/leads/AdminEditLead.jsx'
import AdminViewLeads from './pages/Admin/leads/AdminViewLead.jsx'
import AdminHistoryLeads from './pages/Admin/leads/AdminLeadsHistory.jsx'


const App = () => {


  const navigate = useNavigate();
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



  useEffect(() => {
    if (
      !location.pathname.endsWith("/") &&
      !location.pathname.includes(".")
    ) {
      navigate(location.pathname + "/", { replace: true });
    }
  }, [location.pathname]);

  return (
    <div>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/careers' element={<Careers />} />
          <Route path="/careers/:slug" element={<JobDetails />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path="/services/:serviceSlug" element={<ServicePage />} />
          <Route path='/blogs/:slug' element={<BlogDetails />} />
          <Route path='/terms' element={<TermsAndConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/help-center' element={<HelpCenter />} />

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

            {/* 👇 ADD THESE HERE 👇 */}
            {/* Blogs */}
            <Route path="blogs/add" element={<AdminAddBlog />} />
            <Route path="blogs/edit/:id" element={<AdminEditBlog />} />
            <Route path="blogs/view/:id" element={<AdminViewBlog />} />

            {/* career */}
            <Route path="careers/add" element={<AdminAddCareer />} />
            <Route path="careers/edit/:id" element={<AdminEditCareer />} />
            <Route path="careers/view/:id" element={<AdminViewCareer />} />

            {/* Leads */}
            <Route path="leads/add" element={<AdminAddLeads />} />
            <Route path="leads/edit/:id" element={<AdminEditLeads />} />
            <Route path="leads/view/:id" element={<AdminViewLeads />} />
            <Route path="leads/history" element={<AdminHistoryLeads />} />

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