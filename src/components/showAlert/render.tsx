type BgStyle = 
  | 'bg-red-500'
  | 'bg-white'
  | 'bg-yellow-500'
  | 'bg-green-500'
  | 'bg-transparent';

type TextStyle = 
  | 'text-red-500'
  | 'text-white'
  | 'text-yellow-500'
  | 'text-green-500'
  | 'text-black'; 

interface Props {
    msg: string;
    bgStyle: BgStyle;    
    textStyle: TextStyle;  
}

export default function ShowAlert(props: Props) {
    return (
        <div 
            className="
                absolute top-[2%]         
                left-1/2  -translate-x-1/2 
                z-50 w-[80%] 
                text-center border-2 
                border-white mx-auto 
                mt-2 rounded-lg p-2
            " 
        >
            <p className={`my-1 ${props.bgStyle} ${props.textStyle}`} >{props.msg}</p>
        </div>
    )
}