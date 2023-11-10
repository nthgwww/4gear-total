import React, { memo } from 'react'

const Countdown = ({ unit, number }) => {
    return (
        <div className='w-[30%] h-[60px] flex justify-center items-center bg-[#F4F4F4] rounded-md flex-col'>
            <span className='text-[18px] text-gray-800'>{number}</span>
            <span className='text-xs text-gray-700'>{unit}</span>
        </div>
    )
}

export default memo(Countdown)