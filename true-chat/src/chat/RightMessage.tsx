import React from 'react'

function RightMessage({
  children, time = '12:00 PM'
}: Readonly<{
  children: React.ReactNode;
  time: string;
}>) {
  return (
    <>
      <div className='flex flex-col ms-auto py-0.5 px-2 rounded-sm text-zinc-100 bg-zinc-200 dark:bg-emerald-800 m-0.5 w-max max-w-[60%] '>
        {children}
        <div className='text-[0.6em] mt-0.5 dark:text-zinc-300 ms-auto'>{time}</div>
      </div>
    </>
  )
}

export default RightMessage