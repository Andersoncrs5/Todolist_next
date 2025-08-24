'use client'

import { Providers } from "@/app/providers";
import BtnSubmit from "@/components/BtnSubmit/render";
import BtnUrl from "@/components/btnUrl/render";
import CustomInput from "@/components/input/render";
import ShowAlert from "@/components/showAlert/render";
import ShowAlerts from "@/components/showAlerts/render";
import CustomTextarea from "@/components/textarea/render";
import UseUpdateTask from "./service";

export default function UpdateTask() {

    const {
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
    } = UseUpdateTask();

    return (
        <Providers>
            <div className="flex justify-center items-center min-h-screen text-white p-4">

                {alert && <ShowAlert msg={msg} bgStyle={colorAlert} textStyle={colorTextAlert} border={colorBorderAlert} /> }
                {errorForm && <ShowAlerts msgs={msgErrorForm} bgStyle={"bg-transparent"} textStyle={"text-red-500"} border={"border-red-500"} /> }

                <form onSubmit={updateTask} className="w-full max-w-lg p-8 rounded-lg shadow-2xl border border-white">
                    
                    <h3 className="text-3xl font-bold mb-3 text-center">
                        UPDATE TASK
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
                                placeholder="White your title"
                                border="border-white border w-[100%]" 
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
                        
                        <div className="flex items-center gap-2">
                             <input
                                id="isComplete"
                                type="checkbox"
                                checked={isComplete}
                                onChange={() => setIsComplete(!isComplete)}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="isComplete" className="text-sm font-medium text-white">
                                Task Complete
                            </label>
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
