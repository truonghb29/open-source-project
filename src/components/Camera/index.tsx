import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import { ArrowPathIcon, BoltIcon } from '../../assets/icons'

type Props = {
  setUrl: React.Dispatch<React.SetStateAction<string[]>>
}
const videoConstraints = {
  width: 540,
  facingMode: 'environment',
  height: 600,
}

const Camera = ({ setUrl }: Props) => {
  const webcamRef = useRef(null)

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = await webcamRef.current.getScreenshot()
    setUrl((prevUrls) => [...prevUrls, imageSrc])
  }, [webcamRef])

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="rounded-3xl"
      />
      <div className="flex justify-between mt-4">
        <button className="bg-transparent focus:outline-none">
          <BoltIcon />
        </button>
        <div className="border-2 border-amber-400 rounded-full">
          <button
            onClick={capturePhoto}
            className="h-20 w-20 bg-white rounded-full border-4 border-[#333333] hover:cursor-pointer"
          ></button>
        </div>
        <button
          onClick={() => setUrl([])}
          className="bg-transparent focus:outline-none"
        >
          <ArrowPathIcon />
        </button>
      </div>
    </div>
  )
}

export default Camera
