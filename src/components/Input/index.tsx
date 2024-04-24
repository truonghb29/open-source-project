import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  forwardRef,
} from 'react'

import { twMerge } from 'tailwind-merge'

interface InputProps {
  label?: string
  placeholder?: string
  error?: string | null
  hint?: string
  inputClassName?: string
  labelClassName?: string
  required?: boolean
  disabled?: boolean
  isSuccess?: boolean
  isProgressing?: boolean
  isHiddenErrorMsg?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  typeInput?: string
  onClickRightIcon?: () => void
}

interface Props extends InputHTMLAttributes<HTMLInputElement>, InputProps {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const borderRef = useRef<HTMLDivElement | null>(null)
  const {
    label,
    placeholder,
    error,
    hint,
    required,
    disabled,
    leftIcon,
    rightIcon,
    inputClassName,
    labelClassName,
    className,
    isSuccess = false,
    isProgressing = false,
    isHiddenErrorMsg = false,
    typeInput = 'text',
    onClickRightIcon,
    ...rest
  } = props

  const inputClasses = twMerge(
    'w-full bg-transparent focus:outline-none font-sans text-body-desktop-b2-regular text-white placeholder:text-grey-70 placeholder:font-sans',
    disabled && 'cursor-not-allowed placeholder-text-grey-50',
    className
  )
  const borderClasses = twMerge(
    'w-full p-3 rounded-lg bg-grey-20 border-grey-20 border',
    isSuccess &&
      'border-[1.5px] !border-success-600 focus:outline-success-600 bg-success-1000',
    disabled && 'bg-grey-20',
    error &&
      'border-[1.5px] !border-error-600  focus:outline-error-600 bg-error-1000',
    inputClassName
  )

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (borderRef.current && !disabled) {
      borderRef.current.style.border = '1.5px #ABFFC3 solid'
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        borderRef.current &&
        !borderRef.current.contains(event.target as Node)
      ) {
        borderRef.current.style.border = '1.5px solid transparent'
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [borderRef])

  return (
    <div className={twMerge(className)}>
      {label && (
        <div
          className={twMerge(
            'text-[12px] font-[400] text-grey-95 leading-[18px] mb-[6px] font-sans',
            labelClassName,
            error && 'text-error-600'
          )}
        >
          {label}
          {required && (
            <span
              className={twMerge(
                'text-mint-300 ml-[2px]',
                disabled && 'text-grey-50',
                error && 'text-error-600'
              )}
            >
              *
            </span>
          )}
        </div>
      )}
      <div
        className={twMerge('flex activeClass', borderClasses)}
        ref={borderRef}
        onClick={handleClick}
      >
        {leftIcon && (
          <div className={twMerge('text-grey-70 pr-2')}>{leftIcon}</div>
        )}
        <input
          className={inputClasses}
          disabled={disabled}
          placeholder={placeholder}
          ref={ref}
          type={typeInput}
          {...rest}
        />
        {rightIcon && (
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={onClickRightIcon}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {hint && (
        <p className="text-gray-500 text-[10px] mt-1.5 font-[400] leading-[14px] font-sans">
          {hint}
        </p>
      )}
      {error && !isHiddenErrorMsg && (
        <div className="flex gap-1 mt-1.5 text-[10px]">
          <p className="text-red-600 text-[10px] font-[400] leading-[14px] font-sans">
            {error}
          </p>
        </div>
      )}
      {isSuccess && (
        <div className="flex gap-1 mt-1.5 text-[10px]">
          <p className="text-green-400 text-[10px] font-[400] leading-[14px] font-sans">
            Success
          </p>
        </div>
      )}
      {isProgressing && (
        <div className="flex gap-1 mt-1.5 text-[10px]">
          {rightIcon}
          <p className="text-grey-95 text-[10px] font-[400] leading-[14px] font-sans">
            Progressing
          </p>
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'
