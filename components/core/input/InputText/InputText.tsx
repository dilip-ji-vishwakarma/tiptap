import React from 'react'
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';


type InputProps = {
    column_name: string,
    label?: string,
    required: boolean,
    placeholder?: string;
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
}

export const InputText = ({ column_name, label, required, placeholder, control, errors }: InputProps) => {
    return (
        <div className='w-full'>
            <Controller
                name={column_name}
                control={control}
                defaultValue=""
                rules={{ required: required }}
                render={({ field: { onChange, value } }) => (
                    <>
                        <div className='flex items-center space-x-1'>
                            {required && (
                                <label className='text-[#777777] text-sm font-medium leading-[21px] tracking-[0px] text-left'>
                                    {label} {required && <span className='text-red-500'>*</span>}
                                </label>
                            )}
                        </div>
                        <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]'>
                            <input
                                type="text"
                                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                                placeholder={placeholder}
                                autoComplete="off"
                                value={value}
                                onChange={onChange}
                            />
                        </span>
                    </>

                )}
            />
            {errors[column_name] && <span className="text-red-500 text-sm">Please Enter {label}</span>}
        </div>
    )
}
