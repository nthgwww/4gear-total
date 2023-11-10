import React, { memo } from 'react'

const InputSelect = ({ value, changeValue, options }) => {
    return (
        <select className='form-select text-sm' value={value} onChange={e => changeValue(e.target.value)}>
            <option value="">Random</option>
            {options?.map(el => (
                <option key={el.id} value={el.value}>{el.text}</option>
            ))}
        </select>
    )
}

export default memo(InputSelect)