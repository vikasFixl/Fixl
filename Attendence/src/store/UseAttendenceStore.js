import { create } from 'zustand';
import {AxiosInstance as axios} from "../config/axios.config.js"
import toast from 'react-hot-toast';
const useAttendanceStore = create((set) => ({
  attendanceRecords: [],
  lastMonthRecords: [],
  loading: false,
  error: null,
  message: null,

  // Mark attendance
  markAttendance: async (attendanceData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/attendence/MarkAttendence', attendanceData);
     set({loading: false});
     toast.success("Attendance marked successfully");
     
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to mark attendance',
        loading: false,
      });
      toast.error( err.response?.data?.message);
    }
  },

  // Get all attendance for a user
  getUserAttendance: async (userId) => {
    console.log(userId)
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/attendence/user/${userId}`);
    
      set({ attendanceRecords: response.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch attendance',
        loading: false,
      });
    }
  },

  // Get last month's attendance
  getLastMonthAttendance: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/attendence/user/${userId}/last-month`);
      set({ lastMonthRecords: response.data, loading: false });
      toast.success("Last month's attendance fetched successfully");
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch last month attendance',
        loading: false,
      });
      toast.error( err.response?.data?.message);
    }
  },

  // Reset store
  resetMessages: () => set({ message: null, error: null }),
}));

export default useAttendanceStore;
