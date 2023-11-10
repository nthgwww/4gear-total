import React, { memo } from 'react'

const Banner = () => {
    return (
        <div className='w-full'>
            <img
                src="https://img.freepik.com/vector-gratis/plantilla-oferta-banner-rojo-super-venta_260559-200.jpg"
                alt="banner"
                className='h-[400px] w-full object-cover'
            />
        </div>
    )
}

export default memo(Banner)