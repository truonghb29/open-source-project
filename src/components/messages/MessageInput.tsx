import { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'
import InputEmoji from 'react-input-emoji'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit()
    }
  }

  return (
    <form className="px-4 mt-3 flex items-center" onSubmit={handleSubmit}>
      <InputEmoji
        value={message}
        onChange={setMessage}
        fontFamily="nunito"
        borderColor="#4b5563"
        shouldConvertEmojiToImage={false}
        shouldReturn={false}
        placeholder="Send a message"
        background="#374151"
        fontSize={14}
        borderRadius={8}
        color="#cccccc"
        onKeyDown={handleKeyDown}
      />
      <div>
        <button type="submit" className="flex items-end pl-0 text-[#999999]">
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  )
}
export default MessageInput
