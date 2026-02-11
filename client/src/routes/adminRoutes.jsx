import AdminBlogs from "../pages/Admin/AdminBlogs";
import AdminCareers from "../pages/Admin/AdminCareers";
import AdminContactUs from "../pages/Admin/AdminContactUs";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminSubscribers from "../pages/Admin/AdminSubscribers";


export const adminRoutes = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: "FaHome",
        element: <AdminDashboard />
    },
    {
        name: "Blogs",
        path: "blogs",
        icon: "CgNotes",
        element: <AdminBlogs />
    },
    {
        name: "Careers",
        path: "careers",
        icon: "FaBriefcase",
        element: <AdminCareers />
    },
    {
        name: "Subscribers",
        path: "subscribe",
        icon: "FaMailBulk",
        element: <AdminSubscribers />
    },
    {
        name: "Contact Us",
        path: "contact",
        icon: "FaMailBulk",
        element: <AdminSubscribers />
    },
]