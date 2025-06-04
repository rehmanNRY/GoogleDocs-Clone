import React, { useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { useMutation, useStorage } from '@liveblocks/react';

interface MarkerProps {
  postion: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  postion,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 w-4 cursor-ew-resize z-[5] group h-full -ml-2 transition-transform duration-200",
        isDragging && "scale-110"
      )}
      style={{ [isLeft ? 'left' : 'right']: `${postion}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-600 transform -translate-x-1/2 transition-colors duration-200 group-hover:fill-blue-700" />
      <div
        className={cn(
          'absolute left-1/2 top-4 transform translate-x-1/2 transition-opacity duration-200',
          isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
        style={{
          height: "100vh",
          width: "1px",
          transform: 'scaleX(0.5)',
          backgroundColor: '#3b72f6',
        }}
      />
      <div className="absolute left-1/2 top-4 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {postion}px
      </div>
    </div>
  )
}

const Ruler = () => {
  const leftMargin = useStorage((root) => root.leftMargin) ?? 56
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargin", position)
  }, [])

  const rightMargin = useStorage((root) => root.rightMargin) ?? 56
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargin", position)
  }, [])

  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)

  const rulerRef = useRef<HTMLDivElement>(null)

  const handleMouseDownLeft = () => {
    setIsDraggingLeft(true)
  }

  const handleMouseDownRight = () => {
    setIsDraggingRight(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816; // Width of the page in pixels
    const MINIMUM_WIDTH = 100; // Minimum width for left and right margins
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container')
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const relativeX = e.clientX - containerRect.left
      const rawPosition = Math.max(0, Math.min(816, relativeX))

      if (isDraggingLeft) {
        const maxLeftPostion = PAGE_WIDTH - rightMargin - MINIMUM_WIDTH;
        const newLeftPosition = Math.min(rawPosition, maxLeftPostion);
        setLeftMargin(newLeftPosition);
      } else if (isDraggingRight) {
        const maxRightPosition = PAGE_WIDTH - leftMargin + MINIMUM_WIDTH;
        const newRightPosition = Math.max(816 - rawPosition, 0);
        const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
        setRightMargin(constrainedRightPosition);
      }
    }
  }

  const handleMouseUp = () => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }

  const handleDoubleClickLeft = () => {
    setLeftMargin(56)
  }

  const handleDoubleClickRight = () => {
    setRightMargin(56)
  }

  const markers = Array.from({ length: 83 }, (_, i) => i)
  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className='w-[816px] mx-auto h-8 border-b border-gray-200 flex items-end relative select-none print:hidden bg-white/80 backdrop-blur-sm'>
      <div
        id="ruler-container"
        className='w-full h-full relative'
      >
        <Marker
          postion={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleMouseDownLeft}
          onDoubleClick={handleDoubleClickLeft}
        />
        <Marker
          postion={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleMouseDownRight}
          onDoubleClick={handleDoubleClickRight}
        />
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='h-full relative w-[816px]'>
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className='absolute h-full flex flex-col items-center'
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className='absolute bottom-0 w-[1px] h-3 bg-neutral-400'></div>
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 font-medium -left-[3px]">{marker / 10 + 1}</span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-400"></div>
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-300"></div>
                  )}
                </div>
              )
            }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ruler