import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from 'ultils/path'
import { useSelector } from 'react-redux'
import { MemberSidebar } from 'components'

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />

    return (
        <div className='flex'>
            <MemberSidebar />
            <div className='flex-auto bg-gray-100 min-h-screen'>
                <Outlet />
            </div>
        </div>
    )
}

export default MemberLayout