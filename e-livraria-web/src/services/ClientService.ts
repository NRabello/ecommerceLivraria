import axios from "axios";
import { Client as ClientModel } from "../models/Client";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class ClientService {

    findAll() {
        return axiosInstance.get("/client/findAll");
    }

    save(client: ClientModel) {
        return axiosInstance.post("/client/save", client);
    }

    update(client: ClientModel) {
        return axiosInstance.put("/client/update", client);
    }
    findById(id: number) {
        return axiosInstance.get("/client/findById", {
            params: {
                id: id,
            }
        });
    }

    filter(filter: string){
        return axiosInstance.get("/client/find", {
            params: {
                filter: filter,
            }
        });
    }

    inactive(client: ClientModel){
        return axiosInstance.delete(`client/inactive/${client.id}`);
    }
}