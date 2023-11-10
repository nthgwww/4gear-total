import React, { memo } from 'react'
import usePagination from 'hooks/usePagination'
import { PagiItem } from 'components'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams()
    const pagination = usePagination(totalCount, +params.get('page') || 1)


    const range = () => {
        const currentPage = +params.get('page')
        const pageSize = +process.env.REACT_APP_LIMIT || 10
        const start = Math.min(((currentPage - 1) * pageSize) + 1, totalCount)
        const end = Math.min(currentPage * pageSize, totalCount)

        return `${start} - ${end}`
    }

    // 3 => 21 - 30
    return (
        <div className='flex w-full justify-between items-center'>
            {!+params.get('page') ? <span className='text-sm italic'>{`Show products ${Math.min(totalCount, 1)} - ${Math.min(+process.env.REACT_APP_LIMIT, totalCount)} of ${totalCount}`}</span> : ''}
            {+params.get('page') ? <span className='text-sm italic'>{`Show products ${range()} of ${totalCount}`}</span> : ''}
            <div className='flex items-center'>
                {pagination?.map(el => (
                    <PagiItem key={el}>
                        {el}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default memo(Pagination)

