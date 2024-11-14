import React from 'react'
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';


type InputProps = {
    column_name: string,
    required: boolean,
    placeholder?: string;
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
}

export const InputTextArea = ({ column_name, required, placeholder, control, errors }: InputProps) => {
    return (
        <div className='w-full'>
            <Controller
                name={column_name}
                control={control}
                defaultValue=""
                rules={{ required: required }}
                render={({ field: { onChange, value } }) => (
                   
                       
                            <textarea
                                className="form-control w-full rounded-md focus:outline-none focus:shadow-none shadow-none h-[100px] placeholder:text-[#9D9D9D] text-[14px] p-3 border border-solid border-[#c7c7c7]"
                                placeholder={placeholder}
                                autoComplete="off"
                                value={value}
                                onChange={onChange}
                            />
                       
             
                )}
            />
            {errors[column_name] && (
            <span className="text-red-500 text-xs">
              {errors[column_name]?.message || "This field is required"}
            </span>
          )}
        </div>
    )
}
