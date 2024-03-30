'use client'
// import { useState } from 'react'
import Messages from './Messages'


interface dayProps {
  day: string;
  dayMessages: object[]
}

function Day({ day, dayMessages }: dayProps) {


  return (
    <>
      <div className='text-zinc-400 bg-zinc-800 rounded-md mx-auto max-w-max py-1 px-1.5'>{day}
      </div>
      <Messages messages={dayMessages} />
    </>
  )
}

export default Day