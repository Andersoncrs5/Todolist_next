import { TaskEntity } from "@/models/entities/task.entity";
import QueryParamsTask from "@/service/task/queryParams";
import TaskService from "@/service/task/task.service";
import Page from "@/utils/pages/page";
import ResponseBody from "@/utils/responses/ResponseBody.response";
import { useState, useEffect } from "react";

export default function UseListTasks() {
    const tasksService = new TaskService()

    const [tasks, setTasks] = useState<Page<TaskEntity[]>>(
        {pageNumber : 0,pageSize: 0,totalRecords: 0,code: 0,totalPages: 0,data: []} as Page<TaskEntity[]> );
    
    const [query, setQuery] = useState<QueryParamsTask>();
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoad(true)

        const response: Page<TaskEntity[]> = await tasksService.getAll(query);            
        setTasks(response); 

        setLoad(false)
    };

    async function deleteTask(id: string) {
        const response: ResponseBody<TaskEntity> = await tasksService.delete(id)
        
        fetchTasks()
        return response
    }

    async function changeStatus(id: String) {

    }

    return {
        tasks,
        deleteTask,
        changeStatus,
        setQuery,
        query,
        load
    };
}