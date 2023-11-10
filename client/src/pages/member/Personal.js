import { Button, InputForm } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import avatar from 'assets/avatarDefault.png'
import { apiUpdateCurrent } from 'apis'
import { getCurrent } from 'store/user/asyncActions'
import { toast } from 'react-toastify'
// import { getBase64 } from 'ultils/helpers'
import { useSearchParams } from 'react-router-dom'
import withBaseComponent from 'hocs/withBaseComponent'
import path from 'ultils/path'

const Personal = ({navigate}) => {
    const { register, formState: { errors, isDirty }, handleSubmit, reset} = useForm()
    const { current } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    console.log(searchParams.get('redirect'))
    useEffect(() => {   
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            mobile: current?.mobile,
            email: current?.email,
            avatar: current?.avatar,
            address: current?.address,
        })
    }, [current])

    const handleUpdateInfor = async (data) => {
        const formData = new FormData()
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
        delete data.avatar
        for (let i of Object.entries(data)) formData.append(i[0], i[1])

        const response = await apiUpdateCurrent(formData)
        if (response.success) {
            dispatch(getCurrent())
            toast.success(response.mes)
            if(searchParams.get('redirect')) navigate(searchParams.get('redirect')  )
        } else toast.error(response.mes)
    }
    return (
        <div className='w-full relative px-4'>
            <header className='text-3xl font-semibold py-4 border-b border-b-blue-200'>
                Personal
            </header>
            <form onSubmit={handleSubmit(handleUpdateInfor)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <InputForm
                    label='Firstname'
                    register={register}
                    errors={errors}
                    id='firstname'
                    validate={{
                        required: 'Need fill this field'
                    }}
                />
                <InputForm
                    label='Lastname'
                    register={register}
                    errors={errors}
                    id='lastname'
                    validate={{
                        required: 'Need fill this field'
                    }}
                />
                <InputForm
                    label='Email address'
                    register={register}
                    errors={errors}
                    id='email'
                    validate={{
                        required: 'Need fill this field',
                        pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Email invalid.' }
                    }}
                />
                <InputForm
                    label='Phone'
                    register={register}
                    errors={errors}
                    id='mobile'
                    validate={{
                        required: 'Need fill this field',
                        pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                            message: 'Phone invalid.'
                        }

                    }}
                />
                <InputForm
                    label='Address'
                    register={register}
                    errors={errors}
                    id='address'
                    validate={{
                        required: 'Need fill this field',
                    }}
                />
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Account status:</span>
                    <span>{current?.isBlocked ? 'Blocked' : 'Actived'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Role:</span>
                    <span>{+current?.role === 1945 ? 'Admin' : 'User'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Created At:</span>
                    <span>{moment(current?.createdAt).fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Profile image:</span>
                    <label htmlFor="file">
                        <img src={current?.avatar || avatar} alt="avatar" className='w-20 h-20 ml-8 object-cover rounded-full' />
                    </label>
                    <input type="file" id="file" {...register('avatar')} hidden />
                </div>
                {isDirty && <div className='w-full flex justify-end'><Button type='submit'>Update information</Button></div>}
            </form>
        </div>
    )
}

export default withBaseComponent(Personal)