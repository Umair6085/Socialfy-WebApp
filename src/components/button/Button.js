import React from 'react'

export default function Button({title,onClickHandler}) {
  return (
    <button className='btn btn-primary mx-1 my-2 w-100' onClick={onClickHandler}>{title}</button>
  )
}
