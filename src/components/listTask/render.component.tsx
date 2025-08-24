import { TaskEntity } from "@/models/entities/task.entity"
import ShowTask from "../showTask/showTask.component"
import Page from "@/utils/pages/page"
import ActionMenu from "../ActionMenu/render"
import Btn from "../buttons/btn.component"
import { FaTrash } from "react-icons/fa"
import UseListTasks from "./service.listTask"
import { FaExchangeAlt } from "react-icons/fa";
import { IoIosArrowBack  } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import Pagination from "../pagination/render"
import ShowAlert from "../showAlert/render"

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
        msg
    } = UseListTasks()

    return (
        <>
            {alert && <ShowAlert msg={msg} bgStyle={"bg-transparent"} textStyle={"text-white"}  /> }
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
                                    <div className="basis-3/8 text-center">
                                        <p>{task.description}</p>
                                    </div>
                                    <div className="basis-2/8">
                                        <p>{task.IsComplete ? 'no completed' : 'completed'}</p>
                                    </div>
                                    <div className="basis-1/8 text-center">
                                        <ActionMenu>
                                            <Btn icon={<FaTrash />} funcClick={() => deleteTask(task.id)} margin={"my-2"} /> <br />
                                            <Btn icon={<FaExchangeAlt />} funcClick={() => changeStatus(task.id)} margin={"my-2"} />
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
        </>
    );
}