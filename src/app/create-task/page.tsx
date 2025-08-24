'use client'
import CustomInput from "@/components/input/render";
import { Providers } from "../providers";
import UseCreateTask from "./service";
import CustomTextarea from "@/components/textarea/render";
import BtnSubmit from "@/components/BtnSubmit/render";
import BtnUrl from "@/components/btnUrl/render";
import ShowAlert from "@/components/showAlert/render";
import ShowAlerts from "@/components/showAlerts/render";

export default function CreateTask() {
    const {
        name,
        setName,
        description,
        setDescription,
        isSubmitting,
        handleSubmit,
        colorAlert,
        colorBorderAlert,
        colorTextAlert,
        msg,
        alert,
        errorForm,
        msgErrorForm,
    } = UseCreateTask()

    return (
        <Providers>
            <div className="flex justify-center items-center min-h-screen text-white p-4">
                {alert && <ShowAlert msg={msg} bgStyle={colorAlert} textStyle={colorTextAlert} border={colorBorderAlert} /> }
                {errorForm && <ShowAlerts msgs={msgErrorForm} bgStyle={"bg-transparent"} textStyle={"text-red-500"} border={"border-red-500"} /> }

                <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 rounded-lg shadow-2xl border border-white">
                    
                    <h3 className="text-3xl font-bold mb-3 text-center">
                       CREATE TASK
                    </h3>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col">
                            <CustomInput 
                                min={5}
                                max={50}
                                value={name}
                                nameLabel={"Título"}
                                onChange={(e) => setName(e.target.value)}
                                type={"text"}
                                placeholder="Escreva o título da tarefa"
                                border="border-white border" 
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col gap-6">
                            <CustomTextarea 
                                value={description} 
                                nameLabel={"Description"}
                                onChange={(e) => setDescription(e.target.value) }
                                placeholder="Write the description"
                                more={"border-white border"}
                                rows={3}
                            />
                        </div>
                        
                        <div className="flex justify-end">
                            <BtnUrl url={"/"}  bgColor={"bg-transparent"} name={"BACK"} style={"mx-2 hover:bg-white border-white hover:text-black p-1"} />
                            <BtnSubmit bgColor={"bg-transparent"} more="hover:bg-white hover:text-black" isSubmitting={isSubmitting} />
                        </div>
                    </div>

                </form>
            </div>
        </Providers>
    );
}