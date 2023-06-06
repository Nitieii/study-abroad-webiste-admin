import axios from "axios";

const ENDPOINT = "https://blog-websit-api.onrender.com/api";
// const ENDPOINT = 'http://localhost:8080/api'
// const ENDPOINT = "https://dk4b6zxttxukv.cloudfront.net/api";

const axiosInstance = axios.create({
  baseURL: ENDPOINT,
});


// axiosInstance.interceptors.request.use(
//   (response) => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) localStorage.removeItem("accessToken");
//     response.headers.authorization = token ? `Bearer ${token}` : "";
//     return response;
//   },
//   (error) => Promise.reject(error?.response)
// );

axiosInstance.interceptors.request.use(
  response => {
    const token = localStorage.getItem('accessToken')
    if (!token) localStorage.removeItem('accessToken')
    response.headers.authorization = token ? `Bearer ${token}` : ''
    return response
  },
  error => Promise.reject(error?.response)
)


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)

  // error => Promise.reject(error?.response || 'Something with wrong response')
);

export default axiosInstance;
