import { TaskEntity } from "@/models/entities/task.entity"
import api from "../api"
import { AxiosResponse } from "axios"
import CreateTaskDTO from "@/models/dtos/CreateTaskDTO.dto"
import ResponseBody from "@/utils/responses/ResponseBody.response"
import Page from "@/utils/pages/page"
import QueryParamsTask from "./queryParams"

export default class TaskService {

    private readonly url: string = "/v1/Todo"

    public async getAll(query?: QueryParamsTask): Promise<Page<TaskEntity[]>> {
        try {
            const response = await api.get<Page<TaskEntity[]>>(this.url, {
                params: query
            });
            
            return response.data    
        } catch(err) {
            console.error(err)
            throw err
        }
    }
   
    async delete(id: string): Promise<ResponseBody<TaskEntity>> {
        try {
            const response = await api.delete<ResponseBody<TaskEntity>>(this.url+"/"+id)

            return response.data
        } catch(err) {
            console.log("error the delete task!\nError: " + err)
            throw err
        }
    }

}