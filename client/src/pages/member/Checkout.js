import React, { useEffect, useState } from 'react'
import payment from 'assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney } from 'ultils/helpers'
import { Congrat, InputForm, Paypal } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import { getCurrent } from 'store/user/asyncActions'

const Checkout = ({ dispatch, navigate }) => {
    const { currentCart, current } = useSelector(state => state.user)
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(() => {
        if (isSuccess) dispatch(getCurrent())
    }, [isSuccess])
    return (
        <div className='p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto  gap-6'>
            {isSuccess && <Congrat />}
            <div className='w-full flex justify-center items-center col-span-4'>
                <img src={payment} alt="payment" className='h-[70%] object-contain' />
            </div>
            <div className='flex w-full flex-col justify-center col-span-6 gap-6'>
                <h2 className='text-3xl mb-6 font-bold'>Checkout your order</h2>
                <div className='flex w-full gap-6'>
                    <div className='flex-1'>
                        <table className='table-auto h-fit'>
                            <thead>
                                <tr className='border bg-gray-200'>
                                    <th className='p-2 text-left'>Products</th>
                                    <th className='text-center p-2'>Quantity</th>
                                    <th className='text-right p-2'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCart?.map(el => (<tr className='border' key={el._id}>
                                    <td className='text-left p-2'>{el.title}</td>
                                    <td className='text-center p-2'>{el.quantity}</td>
                                    <td className='text-right p-2'>{formatMoney(el.price) + ' VND'}</td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex-1 flex flex-col justify-between gap-[45px]'>
                        <div className='flex flex-col gap-6'>
                            <span className='flex items-center gap-8 text-sm'>
                                <span className='font-medium'>Subtotal:</span>
                                <span className='text-main font-bold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0))} VND`}</span>
                            </span>
                            <span className='flex items-center gap-8 text-sm'>
                                <span className='font-medium'>Address:</span>
                                <span className='text-main font-bold'>{`${current?.address}`}</span>
                            </span>
                        </div>
                        <div className='w-full mx-auto'>
                            <Paypal
                                payload={{
                                    products: currentCart,
                                    total: Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500),
                                    address: current?.address
                                }}
                                setIsSuccess={setIsSuccess}
                                amount={Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500)}
                            />
                            <button className='justify-center margin-auto'>
                                <a href="https://pay.momo.vn/AUcxuvkMvo"><img src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'></img></a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(Checkout)