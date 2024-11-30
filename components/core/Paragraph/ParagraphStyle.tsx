import React from 'react'

type Paragraph = {
    time: string;
    title: string;
    description: string;
}

export const ParagraphStyle = ({time, title, description}: Paragraph) => {
  return (
    <p className='text-[18px]'><b >{time}</b> <i className='underline'>{title}</i>{description}</p>
  )
}