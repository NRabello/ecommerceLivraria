import axios from "axios";
import { RequestTradeDevolution } from "@/models/RequestTradeDevolution";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class RequestTradeDevolutionService {


    save(requestTradeDevolution: RequestTradeDevolution) {
        return axiosInstance.post("/requestTradeDevolution/save", requestTradeDevolution);
    }

    findById(id: number) {
        return axiosInstance.get("/requestTradeDevolution/findById", {
            params: {
                id: id,
            }
        });
    }

    findByOrder(id: Number){
        return axiosInstance.get("/requestTradeDevolution/find", {
            params: {
                filter: id,
            }
        });
    }
}