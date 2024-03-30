'use client'
import React from 'react'
import LeftMessage from './LeftMessage'
import RightMessage from './RightMessage'
// import Date from './components/Day'

interface messagesProps {
  messages?: object[];
}
function Messages({ messages }: messagesProps) {
  return (
    <>
      <div className='flex flex-col p-2 mb-14'>
        {messages?.map((message: any, index: React.Key) => {
          return (
            <div key={index}>
              {message.Received ?
                <LeftMessage time={message.time}>{message.message}</LeftMessage>
                :
                <RightMessage time={message.time}>{message.message}</RightMessage>
              }
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Messages