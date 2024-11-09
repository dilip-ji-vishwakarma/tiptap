"use client"
import React, { useState } from 'react';

export const FontChanger = () => {
  const [selectedFont, setSelectedFont] = useState('Inter');

  const handleFontChange = (event:any) => {
    const font = event.target.value;
    setSelectedFont(font);
    document.body.style.fontFamily = font;
  };

  return (
    <div>
      <select id="font-selector " className='border p-[5px] rounded-[20px] border-solid border-[#c7c7c7]' value={selectedFont} onChange={handleFontChange}>
        <option value="Roboto">Roboto</option>
        <option value="Open Sans">Open Sans</option>
        <option value="Noto Sans">Noto Sans</option>
        <option value="Lora">Lora</option>
        <option value="Inter">Inter</option>
      </select>
    </div>
  );
};
