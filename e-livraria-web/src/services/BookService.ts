import axios from "axios";
import { Book as BookModel } from "@/models/Book";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
});

export class BookService {

    findAll() {
        return axiosInstance.get("/book/findAll");
    }

    // save(client: ClientModel) {
    //     return axiosInstance.post("/client/save", client);
    // }

    // update(client: ClientModel) {
    //     return axiosInstance.put("/client/update", client);
    // }
    async findById(id: number) {
         return await axiosInstance.get("/book/findById", {
            params: {
                id: id,
            }
        });
    }

    // filter(filter: string){
    //     return axiosInstance.get("/client/find", {
    //         params: {
    //             filter: filter,
    //         }
    //     });
    // }

    // inactive(client: ClientModel){
    //     return axiosInstance.delete(`client/inactive/${client.id}`);
    // }
}