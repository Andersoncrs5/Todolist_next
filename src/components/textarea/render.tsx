interface CustomTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  more?: string;
  nameLabel?: string;
  maxLength?: number;
  minLength?: number;
}

const CustomTextarea: React.FC<CustomTextareaProps> =({
  value,onChange,placeholder = '',rows = 4,more = '',nameLabel = '',maxLength = 9999999,minLength = 1
}) => {
    return (
        <div>
          <label htmlFor={nameLabel}>{nameLabel}</label>
          <textarea
            id={nameLabel}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`border-white rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none w-full ${more}`}
            required
            maxLength={maxLength}
            minLength={minLength}
          />
        </div>
    );
};
export default CustomTextarea