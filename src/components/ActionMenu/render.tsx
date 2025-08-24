import { ReactNode } from "react";
import { FaEllipsisV } from 'react-icons/fa'; 
import { useActionMenu } from "./service";

interface ActionMenuProps {
  children: ReactNode;
}

export default function ActionMenu({ children }: ActionMenuProps) {
    const {
        menuRef,
        setIsOpen,
        isOpen
    } = useActionMenu();

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
            >
                <FaEllipsisV />
            </button>

            {isOpen && (
                <div className="absolute right-0 m-2 w-38 bg-transparent border border-white border-1 rounded-md shadow-lg py-1 z-10">
                    {children}
                </div>
            )}
        </div>
    );
}