import { apiGetUserOrders } from "apis";
import { CustomSelect, InputForm, Pagination } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { statusOrders } from "ultils/contants";

const History = ({navigate, location}) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams()

  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm();
  const q = watch("q");
  const status = watch("status");
  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    console.log(response)
    if (response.success) {
        setCounts(response.counts)
        setOrders(response.orders);
    }
  };
  useEffect(() => {
    const pr = Object.fromEntries([...params])
    fetchOrders(pr);
  }, [params]);

  const handleSearchStatus = ({value}) =>{
    navigate({
      pathname : location.pathname,
      search: createSearchParams({status:value}).toString()
    })
  }
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
        History
      </header>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              placeholder="Search orders by status..."
            />
          </div>
          <div className="col-span-1 flex items-center">
            <CustomSelect options={statusOrders} value={status} onChange={val=>handleSearchStatus(val)} wrapClassname='w-full'/>
          </div>
        </form>
      </div>
      <table className='table-auto w-full'>
                <thead>
                    <tr className='border bg-sky-900 text-white border-white'>
                        <th className='text-center py-2'>#</th>
                        <th className='text-center py-2'>Products</th>
                        <th className='text-center py-2'>Total</th>
                        <th className='text-center py-2'>Status</th>
                        <th className='text-center py-2'>CreatedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((el, idx) => (
                        <tr className='border-b' key={el._id}>
                            <td className='text-center max-w-[500px] py-2'>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + idx + 1}</td>
                            <td className='grid grid-cols-4 gap-4'>
                                <span>{el.products?.map((item) =>
                                <span className="flex gap-2 items-center" key={item._id}>
                                  <img src={item.thumbnail} alt="thumb" className="w-8 h-8 rounded-md object-cover"/>
                                  <span className="flex flex-col">
                                    <span className="text-main text-sm">{item.title}</span>
                                    <span className="flex items-center text-xs">
                                      <span>Quantity:</span>
                                      <span className="text-main">{item.quantity}</span>
                                    </span>
                                  </span>
                                  {/* {`• ${item.title} - ${item.color}`} */}
                                </span>)
                                }
                                </span>
                            </td>
                            <td className='text-center py-2'>{el.total + ` $`}</td>
                            <td className='text-center py-2'>{el.status}</td>
                            <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                            <td className='text-center py-2'>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBaseComponent(History);
