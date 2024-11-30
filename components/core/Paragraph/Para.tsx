import React from 'react'

type ParaProps = {
    lable: string;
}

export const Para = ({lable}: ParaProps) => {
  return (
    <p>{lable}</p>
  )
}
