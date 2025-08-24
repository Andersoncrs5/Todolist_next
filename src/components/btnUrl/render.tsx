import Link from "next/link";
import { ReactNode } from "react"; 

export type BgStyle = 
  | 'bg-red-500'
  | 'bg-white'
  | 'bg-yellow-500'
  | 'bg-green-500'
  | 'bg-transparent';

interface Values {
  url: string;
  bgColor: BgStyle;
  name?: string;
  icon?: ReactNode;
  style?: string;
}

export default function BtnUrl({ style, url, icon, name, bgColor }: Values) {

  return (
    <Link
      href={url}
      className={`
        ${bgColor}
        border border-white       
        p-1
        rounded
        text-white
        hover:bg-white
        hover:text-black
        
        flex  justify-center
        
        ${style}
      `}
    >
      {icon} 
      {name}
    </Link>
  );
}