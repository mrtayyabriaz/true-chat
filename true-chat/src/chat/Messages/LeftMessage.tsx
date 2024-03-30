import React from 'react'

function LeftMessage({
  children, time = '12:00 PM'
}: Readonly<{
  children: React.ReactNode;
  time: string;
}>) {
  return (
    <>
      <div className='flex flex-col py-0.5 px-2.5 rounded-sm bg-zinc-200 dark:bg-zinc-700 m-0.5 w-max max-w-[60%] text-zinc-100 text-sm'>
        {children}
        <div className='text-[0.6em]  dark:text-zinc-300 ms-auto'>{time}</div>
      </div>
    </>
  )
}

export default LeftMessage