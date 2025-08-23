import { TaskEntity } from "@/models/entities/task.entity";
import ActionMenu from "../ActionMenu/render";

interface Props {
    task: TaskEntity
    children: React.ReactNode
}

export default function ShowTask({ task, children }: Props ) {
    return (
        <div className="flex flex-row items-center p-3 my-3 rounded-full border-1 border-white text-white">
            <div className="basis-2/8 text-center">
                <p>{task.name}</p>
            </div>
            <div className="basis-3/8">
                <p>{task.description}</p>
            </div>
            <div className="basis-2/8">
                <p>{task.IsComplete ? 'no completed':'completed' }</p>
            </div>
            <div className="basis-1/8 text-center">
                <ActionMenu>
                    {children}
                </ActionMenu>
            </div>
        </div>
    )
}