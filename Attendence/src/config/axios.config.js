import axios from "axios"




export const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
 
  withCredentials: true, // if you're using cookies
});
