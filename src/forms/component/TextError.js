import React from 'react'

function TextError(props) {
  return (
    <div className='text-red'>{props.children}</div>
  )
}

export default TextError