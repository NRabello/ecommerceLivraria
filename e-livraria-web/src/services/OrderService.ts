import axios from "axios";
import { Order } from "@/models/Order";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class OrderService {

    findAll() {
        return axiosInstance.get("/order/findAll");
    }

    save(order: Order) {
        return axiosInstance.post("/order/save", order);
    }

    findById(id: number) {
        return axiosInstance.get("/order/findById", {
            params: {
                id: id,
            }
        });
    }

    findByClient(id: number){
        return axiosInstance.get("/order/findByClient", {
            params: {
                id: id,
            }
        });
    }

    update(order: Order) {
        return axiosInstance.put("/order/update", order);
    }
}