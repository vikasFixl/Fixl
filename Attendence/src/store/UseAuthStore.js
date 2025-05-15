// src/store/authStore.js

import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AxiosInstance as axios } from "../config/axios.config";


const useAuthStore = create(
  persist(
    (set) => ({
      users: [],
      user: null,
      token: null,
      isLoading: false,

      // actions
      register: async (formData) => {
        try {
          set({ isLoading: true });
          await axios.post("/auth/v1/register", formData);

          toast.success("Registration successful");
          set({ isLoading: false });

          return true;
        } catch (error) {
          toast.error("Registration failed" + error.response.data.message);
          set({ isLoading: false });
          return false;
        }
      },
      login: async (formData) => {
        try {
          set({ isLoading: true });
          const res = await axios.post("/auth/v1/login", formData);
        
          toast.success("Login successful");
          set({ isLoading: false, user: res.data.user, });
          return true;
        } catch (error) {
          set({ isLoading: false });
          toast.error("Login failed" + error.response.data.message);
          return false;
        }
      },
      logout: async () => {
        try {
          const res = await axios.post("/auth/v1/logout");
          set({ user: null, isLoading: false });  // fixed here, was just isLoading
          toast.success("Logout successful");
        } catch (error) {
          toast.error("Logout failed");
          set({ isLoading: false });  // fix to set properly
        }
      },

      getalluser: async () => {
        try {
          set({ isLoading: true });
          const res = await axios.get("/auth/v1/allUsers");

          set({ users: res.data, isLoading: false });
          return true;
        } catch (error) {
          toast.error("profile fetch failed" + error.response.data.message);
          set({ isLoading: false, user: null });
          return false;
        }
      },

      GetProfile: async () => {
        try {
          set({ isLoading: true });
          const res = await axios.get("/auth/v1/MyProfile");

          set({ user: res.data, isLoading: false });
          return true;
        } catch (error) {
          toast.error("profile fetch failed" + error.response.data.message);
          set({ isLoading: false, user: null });
          return false;
        }
      }
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);

export default useAuthStore;
