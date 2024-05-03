import { PromotionalCoupon } from "@/models/PromotionalCoupon";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class PromotionalCouponService {
    
    findAll() {
        return axiosInstance.get("/promotionalCoupon/findAll");
    }  

    save(promotionalCoupon: PromotionalCoupon ) {
        return axiosInstance.post("/promotionalCoupon/save", promotionalCoupon);
    }

    delete (id: number) {
        return axiosInstance.delete(`/promotionalCoupon/delete/${id}`);
    }

    filter(filter: string){
        return axiosInstance.get("/promotionalCoupon/find", {
            params: {
                filter: filter,
            }
        });
    }
}