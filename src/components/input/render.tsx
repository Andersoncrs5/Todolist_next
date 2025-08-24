import React from 'react';

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'hidden'
  | 'time'
  | 'url'
  | 'date'

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: InputType;
  more?: string;
  id?: string;
  nameLabel?: string
  max?: number
  min?: number
  border?: string
  required?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ required = false, border ,min = 0 ,max = 0, nameLabel = '' ,id = '' ,value, onChange, placeholder = '', type = 'text', more = '' }) => {
  return (
    <div>
      <label htmlFor={nameLabel}>{nameLabel}</label>
      <input
        type={type}
        id={id}
        name={nameLabel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${border} rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${more}`}
        required={required}
        maxLength={max == 0 ? 99999 : max }
        minLength={min == 0 ? 1 : min }
      />
    </div>
    
  );
};

export default CustomInput;
