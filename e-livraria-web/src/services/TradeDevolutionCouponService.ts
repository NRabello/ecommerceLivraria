import axios from "axios";
import { TradeDevolutionCoupon } from "@/models/TradeDevolutionCoupon";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class TradeDevolutionCouponService {

    save(tradeDevolutionCoupon: TradeDevolutionCoupon ) {
        return axiosInstance.post("/tradeDevolutionCoupon/save", tradeDevolutionCoupon);
    }

    findByClient(id: number){
        return axiosInstance.get("/tradeDevolutionCoupon/findByClient", {
            params: {
                id: id,
            }
        });
    }
}