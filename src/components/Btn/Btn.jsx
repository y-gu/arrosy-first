import './Btn.scss'
import React from 'react'

export default function Btn({colorScheme,children, type}) {
  return (
    <button type={type} className={ 'stdBtn '+ colorScheme}>{children}</button>
  )
}
