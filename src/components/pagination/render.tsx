// src/components/Pagination.js
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import Btn from "../buttons/btn.component";

interface Props {
    tasks: any
    backPage: any
    nextPage: any
}

export default function Pagination({ tasks, backPage, nextPage }: Props) {
    if (tasks.totalPages <= 1) {
        return null;
    }

    const isFirstPage = tasks.pageNumber === 1;
    const isLastPage = tasks.pageNumber === tasks.totalPages;
    
    return (
        <div className="flex justify-center items-center gap-4 mt-6 text-white">
            
            <Btn 
                funcClick={backPage} 
                icon={<IoIosArrowBack size={20} />} 
                disabled={isFirstPage}
                style={isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}
            />

            <span className="text-sm">
                Página {tasks.pageNumber} de {tasks.totalPages}
            </span>

            <Btn 
                funcClick={nextPage} 
                icon={<GrFormNext size={20} />} 
                disabled={isLastPage}
                style={isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}
            />
        </div>
    );
}