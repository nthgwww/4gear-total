import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createSearchParams, useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts, apiUpdateCart } from 'apis'
import { Breadcrumb, Button, SelectQuantity, ProductExtraInfoItem, ProductInfomation, CustomSlider } from 'components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, fotmatPrice, renderStarFromNumber } from 'ultils/helpers'
import { productExtraInfomation } from 'ultils/contants'
import DOMPurify from 'dompurify';
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import withBaseComponent from 'hocs/withBaseComponent'
import { getCurrent } from 'store/user/asyncActions'
import { toast } from 'react-toastify'
import path from 'ultils/path'
import Swal from 'sweetalert2'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const DetailProduct = ({ isQuickView, data, location, dispatch, navigate }) => {
    const titleRef = useRef()
    const params = useParams()
    const { current } = useSelector(state => state.user)
    const [product, setProduct] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [relatedProducts, setRelatedProducts] = useState(null)
    const [update, setUpdate] = useState(false)
    const [varriant, setVarriant] = useState(null)
    const [pid, setPid] = useState(null)
    const [category, setCategory] = useState(null)
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        thumb: '',
        images: [],
        price: '',
        color: ''
    })
    useEffect(() => {
        if (data) {
            setPid(data.pid)
            setCategory(data.category)
        }
        else if (params && params.pid) {
            setPid(params.pid)
            setCategory(params.category)
        }
    }, [data, params])
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) {
            setProduct(response.productData)
            setCurrentImage(response.productData?.thumb)
        }
    }
    useEffect(() => {
        if (varriant) {
            setCurrentProduct({
                title: product?.varriants?.find(el => el.sku === varriant)?.title,
                color: product?.varriants?.find(el => el.sku === varriant)?.color,
                images: product?.varriants?.find(el => el.sku === varriant)?.images,
                price: product?.varriants?.find(el => el.sku === varriant)?.price,
                thumb: product?.varriants?.find(el => el.sku === varriant)?.thumb,
            })
        } else {
            setCurrentProduct({
                title: product?.title,
                color: product?.color,
                images: product?.images || [],
                price: product?.price,
                thumb: product?.thumb,
            })
        }
    }, [varriant, product])
    const fetchProducts = async () => {
        const response = await apiGetProducts({ category })
        if (response.success) setRelatedProducts(response.products)
    }
    useEffect(() => {
        if (pid) {
            fetchProductData()
            fetchProducts()
        }
        // window.scrollTo(0, 0)
        titleRef.current?.scrollIntoView({ block: 'center' })
    }, [pid])
    useEffect(() => {
        if (pid) fetchProductData()
    }, [update])
    const rerender = useCallback(() => {
        setUpdate(!update)
    }, [update])

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else {
            setQuantity(number)
        }
    }, [quantity])
    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])

    const handleClickImage = (e, el) => {
        e.stopPropagation()
        setCurrentImage(el)
    }
    const handleAddToCart = async () => {
        if (!current) return Swal.fire({
            title: 'Almost...',
            text: 'Please login first!',
            icon: 'info',
            cancelButtonText: 'Not now!',
            showCancelButton: true,
            confirmButtonText: 'Go login page'
        }).then(async (rs) => {
            if (rs.isConfirmed) navigate({
                pathname: `/${path.LOGIN}`,
                search: createSearchParams({ redirect: location.pathname }).toString()
            })
        })
        const response = await apiUpdateCart({
            pid,
            color: currentProduct.color || product?.color,
            quantity,
            price: currentProduct.price || product.price,
            thumbnail: currentProduct.thumb || product.thumb,
            title: currentProduct.title || product.title,
        })
        if (response.success) {
            toast.success(response.mes)
            dispatch(getCurrent())
        }
        else toast.error(response.mes)
    }

    return (
        <devicePixelRatio className={clsx('w-full z-50')}>
            {!isQuickView && <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div ref={titleRef} className='w-main '>
                    <h3 className='font-semibold'>{currentProduct.title || product?.title}</h3>
                    <Breadcrumb title={currentProduct.title || product?.title} category={category} />
                </div>
            </div>}
            <div onClick={e => e.stopPropagation()} className={clsx('bg-white m-auto mt-4 flex', isQuickView ? 'max-w-[900px] gap-16 p-8 max-h-[80vh] overflow-y-auto' : 'w-main')}>
                <div className={clsx('flex flex-col gap-4 w-2/5', isQuickView && 'w-1/2')}>
                    <div className='w-[358px] h-[458px] border flex items-center overflow-hidden'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: '',
                                isFluidWidth: true,
                                src: currentProduct.thumb || currentImage,
                            },
                            largeImage: {
                                src: currentProduct.thumb || currentImage,
                                width: 1800,
                                height: 1500
                            },
                        }} />
                    </div>
                    <div className='w-[358px]'>
                        <Slider className='image-slider flex gap-2 justify-between' {...settings}>
                            {currentProduct.images?.length === 0 && product?.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img onClick={e => handleClickImage(e, el)} src={el} alt='sub-product' className='w-[143px] cursor-pointer h-[143px] border object-cover' />
                                </div>
                            ))}
                            {currentProduct.images?.length > 0 && currentProduct.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img onClick={e => handleClickImage(e, el)} src={el} alt='sub-product' className='w-[143px] cursor-pointer h-[143px] border object-cover' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className={clsx('w-2/5 pr-[24px] flex flex-col gap-4', isQuickView && 'w-1/2')}>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold'>{`${formatMoney(fotmatPrice(currentProduct.price || product?.price))} VNĐ`}</h2>
                        <span className='text-sm text-main'>{`In stock: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (<span key={index}>{el}</span>))}
                        <span className='text-sm text-main italic'>{`(Sold: ${product?.sold} pieces)`}</span>
                    </div>
                    <ul className='list-square text-sm text-gray-500 pl-4'>
                        {product?.description?.length > 1 && product?.description?.map(el => (<li className='leading-6' key={el}>{el}</li>))}
                        {product?.description?.length === 1 && <div className='text-sm line-clamp-[10] mb-8' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}></div>}
                    </ul>
                    <div className='my-4 flex gap-4'>
                        <span className='font-bold'>Color:</span>
                        <div className='flex flex-wrap gap-4 items-center w-full'>
                            <div
                                onClick={() => setVarriant(null)}
                                className={clsx('flex items-center gap-2 p-2 border cursor-pointer', !varriant && 'border-red-500')}
                            >
                                <img src={product?.thumb} alt="thumb" className='w-8 h-8 rounded-md object-cover' />
                                <span className='flex flex-col'>
                                    <span>{product?.color}</span>
                                    <span className='text-sm'>{product?.price}</span>
                                </span>
                            </div>
                            {product?.varriants?.map(el => (
                                <div
                                    key={el.sku}
                                    onClick={() => setVarriant(el.sku)}
                                    className={clsx('flex items-center gap-2 p-2 border cursor-pointer', varriant === el.sku && 'border-red-500')}
                                >
                                    <img src={el.thumb} alt="thumb" className='w-8 h-8 rounded-md object-cover' />
                                    <span className='flex flex-col'>
                                        <span>{el.color}</span>
                                        <span className='text-sm'>{el.price}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <div className='flex items-center gap-4'>
                            <span className='font-semibold'>Quantity</span>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button handleOnClick={handleAddToCart} fw>
                            Add to Cart
                        </Button>
                    </div>
                </div>
                {!isQuickView && <div className='w-1/5'>
                    {productExtraInfomation.map(el => (
                        <ProductExtraInfoItem
                            key={el.id}
                            title={el.title}
                            icon={el.icon}
                            sub={el.sub}
                        />
                    ))}
                </div>}
            </div>
            {!isQuickView && <div className='w-main m-auto mt-8'>
                <ProductInfomation
                    totalRatings={product?.totalRatings}
                    ratings={product?.ratings}
                    nameProduct={product?.title}
                    pid={product?._id}
                    rerender={rerender}
                />
            </div>}
            {!isQuickView && <>
                <div className='w-main m-auto mt-8'>
                    <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>OTHER CUSTOMER ALSO LIKED</h3>
                    <CustomSlider normal={true} products={relatedProducts} />
                </div>
                <div className='h-[100px] w-full'></div>
            </>}
        </devicePixelRatio>
    )
}

export default withBaseComponent(DetailProduct)