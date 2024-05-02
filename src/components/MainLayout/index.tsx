import React from 'react'
import { twMerge } from 'tailwind-merge'
type Props = {
  className?: string
  children: React.ReactNode
}

const MainLayout = ({ className, children }: Props) => {
  return (
    <div
      className={twMerge(
        'max-w-[800px] mx-auto flex justify-center px-4 pt-10',
        className
      )}
    >
      <div className="w-full">{children}</div>
    </div>
  )
}

export default MainLayout
