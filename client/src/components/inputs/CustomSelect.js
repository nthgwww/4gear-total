import clsx from 'clsx'
import React from 'react'
import Select from 'react-select'

const CustomSelect = ({label, placeholder, onChange, options=[], value, classname, wrapClassname}) => {
  return (
    <div className={clsx(wrapClassname)}>
        {label && <h3 className='font-medium'>{label}</h3>}
        <Select 
        placeholder={placeholder}
        isClearable
        options={options}
        value={value}
        isSearchable
        onChange={val =>onChange(val)}
        formatOptionLabel={(option) => (
            <div classname="flex text-black items-center gap-2">
                <span>{option.label}</span>
            </div>
        )}
        className={{control:() => clsx('border-2 py-[2px]', classname)}}
        />
    </div>
  )
}

export default CustomSelect