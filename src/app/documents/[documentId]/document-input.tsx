import React from 'react'
import { BsCloudCheck } from 'react-icons/bs'

const DocumentInput = () => {
  return (
    <div className='flex items-center gap-2 pl-2'>
      <span className='text-lg px-1.5 cursor-pointer truncate'>
        Untitled Document
      </span>
      <BsCloudCheck className='text-lg cursor-pointer' />
    </div>
  )
}

export default DocumentInput