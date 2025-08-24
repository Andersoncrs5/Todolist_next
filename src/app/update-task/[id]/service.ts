'use client'

import { BgStyle, TextStyle, BorderStyle } from "@/components/showAlert/types";
import UpdateTaskDTO from "@/models/dtos/UpdateTaskDTO.dto";
import { TaskEntity } from "@/models/entities/task.entity";
import api from "@/service/api";
import ResponseBody from "@/utils/responses/ResponseBody.response";
import ResponseError, { ValidationErrors } from "@/utils/responses/ResponseError";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UseUpdateTask() {
    const { id } = useParams<{id: string}>();
    
    const timeMsg = 6000;
    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isComplete, setIsComplete] = useState<boolean>(false);

    const [msg, setMsg] = useState<string>('');
    const [colorAlert, setColorAlert] = useState<BgStyle>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyle>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyle>("border-white");
    const [alert, setAlert] = useState<boolean>(false);

    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        getTask();
    }, [id]);

    async function getTask() {
        try {
            const response = await api.get<ResponseBody<TaskEntity>>(`/v1/Todo/${id}`);

            setName(response.data.data?.name || '');
            setDescription(response.data.data?.description || '');
            setIsComplete(response.data.data?.isComplete || false);

        } catch (err) {
            const error = err as AxiosError<ResponseError>;
            const errorMsg = error.response?.data?.title || "Error getting task data! Please try again later";
            showAlertFunc(errorMsg, "bg-transparent", 'text-red-500', 'border-red-500');
            router.push("/");
        }
    }

    async function updateTask(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        const dto: UpdateTaskDTO = { name, description, isComplete };

        try {
            const response = await api.put<ResponseBody<string>>(`/v1/Todo/${id}`, dto);

            if (response.data.code >= 200 && response.data.code <= 299) {
                showAlertFunc(response.data.message, "bg-transparent", "text-green-500", "border-green-500");
                router.push('/');
            }

        } catch (error) {
            const err = error as AxiosError<ResponseError>;
            const status = err.response?.status;

            if (!status) {
                showAlertFunc("Error to update task! Please try again later", "bg-transparent", "text-red-500", "border-red-500");
                router.push("/");
                return;
            }

            
            if (status === 400 && err.response?.data?.errors) {

                const nameErrors = (err.response.data.errors as ValidationErrors).Name;
                if (nameErrors && nameErrors.length > 0) {
                    showErrorMsgForm(nameErrors, "bg-transparent", 'text-red-500', 'border-red-500');
                } else {
                    showAlertFunc(err.response.data.title || "Unknown validation error.", "bg-transparent", "text-red-500", "border-red-500");
                }
            }
            
            if (status >= 500 && status <= 599) {
                showAlertFunc("Server error! Please try again later", "bg-transparent", 'text-red-500', 'border-red-500');
                router.push("/");
            }
        } finally {
            setIsSubmitting(false);
            clearInputs()
        }
    }

     function showAlertFunc(msg: string, bg: BgStyle, text: TextStyle, border: BorderStyle) {
        setAlert(true);
        setColorAlert(bg);
        setColorTextAlert(text);
        setColorBorderAlert(border);
        setMsg(msg);
        setTimeout(() => setAlert(false), timeMsg);
    }

    function showErrorMsgForm(msg: string[], bg: BgStyle, text: TextStyle, border: BorderStyle) {
        setErrorForm(true);
        setColorAlert(bg);
        setColorTextAlert(text);
        setColorBorderAlert(border);
        setMsgErrorForm(msg);
        setTimeout(() => setErrorForm(false), timeMsg);
    }

    function clearInputs() {
        setDescription('');
        setName('');
        setIsComplete(false);
    }

    return {
        name,
        setName,
        description,
        setDescription,
        isComplete,
        setIsComplete,
        isSubmitting,
        updateTask, 
        msg,
        colorAlert,
        colorTextAlert,
        colorBorderAlert,
        alert,
        errorForm,
        msgErrorForm
    };
}

