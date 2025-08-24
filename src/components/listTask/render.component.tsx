import { TaskEntity } from "@/models/entities/task.entity"
import ActionMenu from "../ActionMenu/render"
import Btn from "../buttons/btn.component"
import { FaTrash } from "react-icons/fa"
import UseListTasks from "./service.listTask"
import { FaExchangeAlt } from "react-icons/fa";
import Pagination from "../pagination/render"
import ShowAlert from "../showAlert/render"
import { RxUpdate } from "react-icons/rx";
import { MdCreate } from "react-icons/md"
import BtnUrl from "../btnUrl/render"
import Header from "../header.component"
import CustomInput from "../input/render"

export default function ListTasks() {
    const { 
        tasks, 
        deleteTask,
        changeStatus,
        load,
        backPage,
        nextPage,
        query,
        setQuery,
        alert,
        msg,
        colorAlert,
        colorTextAlert,
        colorBorderAlert,
        updateTask,    
    } = UseListTasks()

    return (
        <>
                <Header
                    rightContent={
                        <BtnUrl url={"/create-task"} icon={ <MdCreate /> } bgColor={"bg-transparent"} style={"p-1"} />
                    }
                    middleContent={
                        <CustomInput 
                            value={query.SearchTitle || ""}
                            onChange={(e) => setQuery(prevQuery => ({ ...prevQuery, SearchTitle: e.target.value }))}
                            type={"text"}
                            placeholder="Write title to search"
                            border="border-white border" 
                            more="mx-auto text-white w-[80%]"
                        />
                    }
                />
            <main>
                {alert && <ShowAlert msg={msg} bgStyle={colorAlert} textStyle={colorTextAlert} border={colorBorderAlert}  /> }
                
                {load ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <>
                        <div className="w-[85%] m-auto">
                            {tasks.data.length > 0 ? (
                                tasks.data.map((task: TaskEntity) => (
                                    <div key={task.id} className="flex flex-row items-center p-3 my-3 rounded-full border-1 border-white text-white">
                                        <div className="basis-2/8 text-center">
                                            <p>{task.name}</p>
                                        </div>
                                        <div className="basis-4/8 text-center">
                                            <p>{task.description}</p>
                                        </div>
                                        <div className="basis-1/8">
                                            <p>{task.isComplete ? 'completed' : 'no completed'}</p>
                                        </div>
                                        <div className="basis-1/8 text-center">
                                            <ActionMenu>
                                                <Btn icon={<FaTrash />} funcClick={() => deleteTask(task.id)} margin={"my-2"} /> <br />
                                                <Btn icon={<FaExchangeAlt />} funcClick={() => changeStatus(task.id)} margin={"my-2"} /> <br />
                                                <Btn icon={<RxUpdate />} funcClick={() => updateTask(task.id)} margin={"my-2"} />
                                            </ActionMenu>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center items-center min-h-screen">
                                    <h1 className="text-white" >NO TASKS</h1>
                                </div>
                            )}
                            <Pagination 
                                tasks={tasks}
                                backPage={backPage}
                                nextPage={nextPage}
                            />
                        </div>
                    </>
                )}
            </main>
        </>
    );
}