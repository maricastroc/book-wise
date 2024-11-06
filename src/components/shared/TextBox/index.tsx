import { useEffect, useRef, useState } from 'react'
import { ViewMoreButton, TextBoxContent, TextBoxWrapper } from './styles'

interface TextBoxProps {
  maxHeight?: string
  description: string
  variant?: 'primary' | 'secondary'
}

export function TextBox({
  maxHeight = '4.2rem',
  description,
  variant = 'primary',
}: TextBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const [isOverflowing, setIsOverflowing] = useState(false)

  const summaryRef = useRef<HTMLDivElement | null>(null)

  const checkOverflow = () => {
    const el = summaryRef.current
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight)
    }
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [description])

  return (
    <TextBoxWrapper>
      <TextBoxContent
        ref={summaryRef}
        style={{
          maxHeight: isExpanded ? 'none' : maxHeight,
          overflowY: isExpanded ? 'visible' : 'hidden',
        }}
      >
        <p>{description}</p>
      </TextBoxContent>
      {isOverflowing && (
        <ViewMoreButton
          className={variant}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'view less' : 'view more'}
        </ViewMoreButton>
      )}
    </TextBoxWrapper>
  )
}