// src/components/Btn.tsx
import React from 'react';
import { IconType } from 'react-icons';

interface Types {
    title?: string
    funcClick: () => any,
    icon?: any,
    margin?: string,
    style?: string,
    disabled?: boolean
}

export default function Btn({ title, funcClick, icon, margin, disabled,style }: Types) {
    return (
        <button
            className={`bg-transparent border-1 border-white p-2 rounded-full text-white hover:bg-white hover:text-black ${margin} ${style}`}
            onClick={funcClick}
            disabled={disabled}
        >
            {icon} {title}
        </button>
    )
}