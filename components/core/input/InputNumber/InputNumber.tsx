"use client"
import React, { useState } from 'react';
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

type InputProps = {
    column_name: string;
    required: boolean;
    placeholder?: string;
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
    defaultValue?: string | number;
    hidden?: boolean;
};

export const InputNumber = ({
    column_name,
    required,
    placeholder,
    control,
    errors,
    defaultValue,
    hidden = false,
}: InputProps) => {
    const [inputValue, setInputValue] = useState(defaultValue || '');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    return (
        <div className={`w-full ${hidden ? "hidden" : ""}`}>
            <Controller
                name={column_name}
                control={control}
                defaultValue={defaultValue}
                rules={{
                    required: required,
                    pattern: {
                        value: /^[0-9]*$/,
                        message: 'Please enter a valid number',
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <>
                        <span className="input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]">
                            <input
                                type="number"
                                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                                placeholder={placeholder}
                                autoComplete="off"
                                value={inputValue}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    onChange(e);
                                }}
                                min="0"
                            />
                        </span>
                    </>
                )}
            />
            {errors[column_name] && <span className="text-red-500 text-sm">{errors[column_name]?.message}</span>}
        </div>
    );
};
