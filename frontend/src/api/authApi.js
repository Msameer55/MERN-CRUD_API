import axiosInstance from "../config/axios";

const AuthApi = {
    register : (email, password) => axiosInstance.post("/api/users/register", {email, password}),
    login : (email, password) => axiosInstance.post("/api/users/login", {email, password})
}

export default AuthApi;