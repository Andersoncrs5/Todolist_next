import { TaskEntity } from "@/models/entities/task.entity";
import QueryParamsTask from "@/service/task/queryParams";
import TaskService from "@/service/task/task.service";
import Page from "@/utils/pages/page";
import ResponseBody from "@/utils/responses/ResponseBody.response";
import { useState, useEffect } from "react";
import { BgStyle, BorderStyle, TextStyle } from "../showAlert/types";
import { useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/service/api";

export default function UseListTasks() {
    const router = useRouter()
    const tasksService = new TaskService()

    const [tasks, setTasks] = useState<Page<TaskEntity[]>>(
        {pageNumber : 0,pageSize: 0,totalRecords: 0,
            code: 0,totalPages: 0,data: []} as Page<TaskEntity[]> );
    
    const [colorAlert, setColorAlert] = useState<BgStyle>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyle>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyle>("border-white");
            
    const [load, setLoad] = useState<boolean>(true);

    const [alert, setAlert] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const [query, setQuery] = useState<QueryParamsTask>({
        PageNumber: 1,PageSize: 10, SearchTitle: ''
    } as QueryParamsTask);

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
        
        await fetchTasks()
        
        if (response.code >= 400 && response.code <= 499) {
            showAlertFunc(response.message, "bg-transparent", "text-yellow-500", "border-yellow-500")
        }

        if (response.code >= 200 && response.code <= 299) {
            showAlertFunc(response.message, "bg-transparent", "text-green-500", "border-white")
        }
    }

    async function changeStatus(id: string) {
        try {
            const response: AxiosResponse<ResponseBody<TaskEntity>, any> = await api.get<ResponseBody<TaskEntity>>(`/v1/Todo/change/${id}`)
            
            if (response.data.code >= 200 && response.data.code <= 299) {
                showAlertFunc(response.data.message, "bg-transparent", "text-green-500", "border-white")
                await fetchTasks()
            }
        
        } catch(err: any) {
            const error = err as AxiosError

            if (error.response?.status && error.response?.status >= 500 && error.response?.status <= 599) {
                showAlertFunc("Error in server! Please try again later", "bg-transparent", "text-yellow-500", "border-yellow-500")
            }
        }
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

    function showAlertFunc(msg: string, bg: BgStyle, text: TextStyle, border: BorderStyle) {
        setAlert(true)
        setColorAlert(bg)
        setColorTextAlert(text)
        setColorBorderAlert(border)

        setMsg(msg)

        setTimeout(() =>{
            setAlert(false)
        }, 6000)
    }

    function updateTask(id: string) {
        router.push("/update-task/"+id)
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
        msg,
        colorAlert,
        colorTextAlert,
        colorBorderAlert,
        updateTask,
    };
}