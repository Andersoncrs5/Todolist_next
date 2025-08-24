'use client'
import { BgStyle, BorderStyle, TextStyle } from "@/components/showAlert/types";
import CreateTaskDTO from "@/models/dtos/CreateTaskDTO.dto";
import { TaskEntity } from "@/models/entities/task.entity";
import api from "@/service/api";
import ResponseBody from "@/utils/responses/ResponseBody.response";
import ResponseError from "@/utils/responses/ResponseError";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UseCreateTask() {
    const timeMsg = 6000
    const router = useRouter()

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const [msg, setMsg] = useState<string>('');

    const [colorAlert, setColorAlert] = useState<BgStyle>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyle>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyle>("border-white");

    const [alert, setAlert] = useState<boolean>(false);

    const [errorForm, setErrorForm] = useState<boolean>(false);

    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        const dto: CreateTaskDTO = { name, description } as CreateTaskDTO

        try {
            const response: AxiosResponse<ResponseBody<TaskEntity>, any> = await api.post('/v1/Todo', dto)

            if (
                response.data.code === 200 || response.data.code >= 202 && response.data.code <= 299
            ) {
                showAlertFunc(response.data.message, "bg-transparent", "text-green-500", "border-green-500")
            }


            if (response.data.code === 201) {
                showAlertFunc(response.data.message, "bg-transparent", "text-green-500", "border-green-500")

                setTimeout(() => {
                    router.push('/')
                }, timeMsg)
            }

        } catch(error) {
            const err = error as AxiosError<ResponseError>;
            console.log(err)
            const status = err.response?.data.status

            if (!status) {
                showAlertFunc("Error the create task! Please try again later", "bg-transparent", "text-red-500", "border-red-500")
                router.push("/")
                return 
            }

            if (status === 400) {
                showErrorMsgForm(err.response?.data.errors.Name as string[] , "bg-transparent", 'text-red-500', 'border-red-500')
            }

            if (status >= 500 &&  status <= 599 ) {
                showAlertFunc("Error The to create task! Please try again later" , "bg-transparent", 'text-red-500', 'border-red-500')
                router.push("/")
            }

        } finally {
            clearInputs()
            setIsSubmitting(false)
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
        }, timeMsg)
    }

    function showErrorMsgForm(msg: string[], bg: BgStyle, text: TextStyle, border: BorderStyle) {
        
        setErrorForm(true)
        setColorAlert(bg)
        setColorTextAlert(text)
        setColorBorderAlert(border)

        setMsgErrorForm(msg)

        setTimeout(() =>{
            setErrorForm(false)
        }, timeMsg)
    }

    function clearInputs() {
        setDescription('')
        setName('')
    }

    return {
        name,
        description,
        setName,
        setDescription,
        isSubmitting,
        colorAlert,
        colorTextAlert,
        colorBorderAlert,
        handleSubmit,
        msg,
        alert,
        errorForm,
        msgErrorForm
    }
}
