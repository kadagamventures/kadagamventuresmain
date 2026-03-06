import AdminBlogs from "../pages/Admin/AdminBlogs";
import AdminCareers from "../pages/Admin/AdminCareers";
import AdminContactUs from "../pages/Admin/AdminContactUs";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminSubscribers from "../pages/Admin/AdminSubscribers";
import AdminWorkTogether  from "../pages/Admin/AdminWorkTogether"
import BusinessSettings from "../pages/Admin/BusinessSettings";
import CompanyList from "../pages/Admin/CompanyList";
import InvoiceList from "../pages/Admin/InvoiceList";
import InvoiceDetails from "../pages/Admin/InvoiceDetails/InvoiceDetails";
import AdminLeads from "../pages/Admin/leads/AdminLeads"



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
        icon: "FaPhoneAlt",
        element: <AdminContactUs />
    },
    {
        name: "Work Together",
        path: "work-together",
        icon: "CgNotes",
        element: <AdminWorkTogether />
      },
      {
         name: "Leads",
         path: "leads",
         icon: "FaBuilding",
         element: <AdminLeads/>
      },
      {
        name: "Companies",
        path: "companies",
        icon: "FaBuilding",
        element: <CompanyList />
    },
    {
        name: "Invoices",
        path: "invoices",
        icon: "FaFileInvoice",
        element: <InvoiceList />
    },
    {
        name: "Business Settings",
        path: "business",
        icon: "FaCog",
        element: <BusinessSettings />
    },
    

    {
        path: "invoices/:id",
        element: <InvoiceDetails />,
    },
]