import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class BannerService {
    
    findAll() {
        return axiosInstance.get("/banner/findAll");
    }  
}