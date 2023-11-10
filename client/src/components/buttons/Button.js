import React, { memo } from 'react'

const Button = ({ children, handleOnClick, style, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={style ? style : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {children}
        </button>
    )
}

export default memo(Button)