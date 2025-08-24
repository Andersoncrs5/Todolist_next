import { ReactNode } from "react";

interface Props {
    middleContent?: ReactNode;
    rightContent?: ReactNode;
}

export default function Header({ middleContent, rightContent }: Props) {
    return (
        <div className="flex flex-row items-center p-3 border-1 border-white">
            <div className="basis-1/8 text-center">
                <h2 className="text-2xl font-bold text-white">My Task</h2>
            </div>
            <div className="basis-6/8 text-center py-2">
                {middleContent}
            </div>
            <div className="basis-1/8 text-center">
                {rightContent}
            </div>
        </div>
    );
}
