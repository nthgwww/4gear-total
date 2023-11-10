import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo } from 'react'
import { renderStarFromNumber, formatMoney } from 'ultils/helpers'
import path from 'ultils/path'

const ProductCard = ({ price, totalRatings, title, image, pid, navigate, category }) => {
    return (
        <div onClick={(e) =>
            navigate(
              `/${category?.toLowerCase()}/${pid}/${title}`
            )
          }className='w-1/3 flex-auto cursor-pointer px-[10px] mb-[20px]'>
            <div className='flex w-full border'>
                <img src={image} alt="products" className='w-[120px] object-contain p-4' />
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-xs'>
                    <span className='line-clamp-1 capitalize text-sm'>{title?.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span>{`${formatMoney(price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(ProductCard))