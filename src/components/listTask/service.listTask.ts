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
    
    const [query, setQuery] = useState<QueryParamsTask>({
        PageNumber: 1,
        PageSize: 10
    } as QueryParamsTask);
            
    const [load, setLoad] = useState<boolean>(true);

    const [alert, setAlert] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    useEffect(() => {
        fetchTasks();
    }, [query]);

    const fetchTasks = async () => {
        setLoad(true)

        const response: Page<TaskEntity[]> = await tasksService.getAll(query);            
        setTasks(response); 

        setLoad(false)
    };

    async function deleteTask(id: string) {
        const response: ResponseBody<TaskEntity> = await tasksService.delete(id)
        
        fetchTasks()
        
        if (response.code >= 200 || response.code <= 299) {
            showErr(response.message)
        }

        if (response.code >= 400 || response.code <= 499) {
            showErr(response.message)
        }


    }

    async function changeStatus(id: string) {
        const response: ResponseBody<TaskEntity> = await tasksService.changeStatus(id)

        return response
    }

    function nextPage() {
        if (tasks.pageNumber < tasks.totalPages) {
            setQuery(prevQuery => ({
                ...prevQuery,
                PageNumber: (prevQuery.PageNumber || 1) + 1,
            }));
        }
    }

    function backPage() {
        if (tasks.pageNumber > 1) {
            setQuery(prevQuery => ({
                ...prevQuery,
                PageNumber: Math.max(1, (prevQuery.PageNumber || 1) - 1),
            }));
        }
    }

    function showErr(msg: string) {
        setAlert(true)

        setMsg(msg)

        setTimeout(() =>{
            setAlert(false)
        }, 5000)
    }

    return {
        tasks,
        deleteTask,
        changeStatus,
        setQuery,
        query,
        load,
        backPage,
        nextPage,
        alert,
        msg
    };
}