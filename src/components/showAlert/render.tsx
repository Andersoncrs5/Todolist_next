import { BgStyle, BorderStyle, TextStyle } from "./types";

interface Props {
    msg: string;
    bgStyle: BgStyle;    
    textStyle: TextStyle;  
    border: BorderStyle
}

export default function ShowAlert(props: Props) {
    return (
        <div 
            className={`
                absolute top-[2%]         
                left-1/2 -translate-x-1/2 
                z-50 w-[80%] 
                text-center
                border ${props.border}
                mt-2 rounded p-2
                ${props.bgStyle}
            `} 
        >
            <p className={`my-1 ${props.textStyle}`} >{props.msg}</p>
        </div>
    )
}






