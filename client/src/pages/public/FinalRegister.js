import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import Swal from 'sweetalert2'

const FinalRegister = () => {
    const { status } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (status === 'failed') Swal.fire('Oop!', 'Đăng ký không thành công', 'error').then(() => {
            navigate(`/${path.LOGIN}`)
        })
        if (status === 'success') Swal.fire('Congratudation!', 'Đăng ký thành công. Hãy đăng nhập', 'success').then(() => {
            navigate(`/${path.LOGIN}`)
        })
    }, [])
    return (
        <div className='h-screen w-screen bg-gray-100'></div>
    )
}

export default FinalRegister