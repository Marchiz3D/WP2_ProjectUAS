import axios from "axios";
import { jwtDecode } from "jwt-decode";

let token = '';
let expire = 0;

const refreshToken = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/customers/token', { withCredentials: true });
    token = response.data.token;
    const decoded = jwtDecode(token);
    expire = decoded.exp;
    return token;
  } catch (error) {
    console.log(error);
    throw error
  }
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  }
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      try {
        token = await refreshToken();
      } catch (error) {
        console.log(error);
      }
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
)

export default axiosInstance;