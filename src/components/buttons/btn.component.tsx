// src/components/Btn.tsx
import React from 'react';
import { IconType } from 'react-icons';

interface Types {
    title?: string
    funcClick: () => any,
    icon?: any,
    margin?: string
}

export default function Btn({ title, funcClick, icon, margin }: Types) {
    return (
        <button
            className={`bg-transparent border-1 border-white p-2 rounded-full text-white hover:bg-white hover:text-black ${margin}`}
            onClick={funcClick}
        >
            {icon} {title}
        </button>
    )
}