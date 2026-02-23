// import { create } from "zustand"
// import { dummyBlogs } from "./dummyBlogs.js"
// // import axios from "axios"

// // const api = axios.create({
// //     baseURL: import.meta.env.VITE_API_URL,
// //     withCredentials: true,
// // })

// const useBlogsStore = create((set, get) => ({

//     // ===== STATE =====
//     blogs: [],
//     loading: false,
//     error: null,

//     // ===== ACTIONS =====
//     fetchBlogs: async () => {
//         try {
//             set({ loading: true, error: null })

//             /*
//             ===============================
//             🔗 REAL API (UNCOMMENT LATER)
//             ===============================
//             */
//             // const res = await api.get("/api/blogs")
//             // set({
//             //     blogs: res.data.data,
//             //     loading: false,
//             // })
//             // return

//             /*
//             ===============================
//             🧪 DUMMY DATA (CURRENT)
//             ===============================
//             */
//             await new Promise((res) => setTimeout(res, 300))

//             const blogsData = dummyBlogs?.[0]?.data || []

//             set({
//                 blogs: blogsData,
//                 loading: false,
//             })
//         } catch (err) {
//             set({
//                 error: "Failed to fetch blogs",
//                 loading: false,
//             })
//         }
//     },

//     // Get single blog by slug
//     getBlogBySlug: (slug) => {
//         return get().blogs.find((blog) => blog.slug === slug)
//     },

//     // Recommended blogs
//     getRecommendedBlogs: () => {
//         return get().blogs.filter((blog) => blog.isRecommended)
//     },

//     // Reset store
//     resetBlogs: () => {
//         set({ blogs: [], loading: false, error: null })
//     },
// }))

// export default useBlogsStore

import { create } from "zustand"
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useBlogsStore = create((set, get) => ({

    blogs: [],
    loading: false,
    error: null,

    fetchBlogs: async () => {
        try {
            set({ loading: true, error: null })

            const res = await api.get("/blogs")

            set({
                blogs: res.data.data,
                loading: false,
            })
        } catch (err) {
            set({
                error: err.response?.data?.message || "Failed to fetch blogs",
                loading: false,
            })
        }
    },

    getBlogBySlug: (slug) => {
        return get().blogs.find((blog) => blog.slug === slug)
    },

    getRecommendedBlogs: () => {
        return get().blogs.filter((blog) => blog.isRecommended)
    },

    resetBlogs: () => {
        set({ blogs: [], loading: false, error: null })
    },
}))

export default useBlogsStore
