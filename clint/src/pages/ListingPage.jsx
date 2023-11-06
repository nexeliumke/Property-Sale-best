import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BsArrowRight, BsArrowLeft, BsArrowDown } from "react-icons/bs";
import { BiSolidArea } from 'react-icons/bi'
import { FaLocationArrow, FaBed, FaBath, FaAngleUp, FaAngleDown } from "react-icons/fa"


const ListingPage = () => {

    const [listings, setListings] = useState({})
    const [isFeatureActive, setIsFeatureActive] = useState(false)
    const [loading, setLoading] = useState(false)



    const { area, address, bath, bed, description, discountPrice, furnished, offer, parking, price, title, type } = listings;

    const navigate = useNavigate()
    const params = useParams();





    //====== Loading Post Data Here ======//
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/posts/${params.id}`)
            const json = await res.json();
            if (json.success === false) {
                toast.error(json.message, {
                    autoClose: 2000,
                })
            }
            else {
                setListings(json)
            }
        })()
    }, [])

    console.log(listings);


    //====SLider Functions=====//
    function SamplePrevArrow({ onClick }) {
        return (
            <div
                className='absolute top-1/2 left-0 z-10  -translate-y-1/2 p-2 sm:p-4 rounded-e-md bg-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/90 duration-300'
                onClick={onClick}
            >
                <BsArrowLeft className='text-brand-blue text-lg sm:text-2xl' />
            </div>
        )
    }
    function SampleNextArrow({ onClick }) {
        return (
            <div
                className='absolute top-1/2 right-0 z-10  -translate-y-1/2 p-2 sm:p-4 rounded-s-md bg-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/90 duration-300'
                onClick={onClick}
            >
                <BsArrowRight className='text-brand-blue text-lg sm:text-2xl' />
            </div>
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        lazyLoad: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
        appendDots: dots => (
            <div style={{ bottom: 25, }}>
                <ul style={{ margin: "0px", color: '#fff' }}> {dots} </ul>
            </div>
        ),
    };


    // ======Handling User Post DELETE  =====//
    const handlePostDelete = async (postId) => {
        try {
            const res = await fetch(`/api/posts/delete/${postId}`, {
                method: 'DELETE',
            })
            const data = await res.json();
            //===checking reqest success or not ===//
            if (data.success === false) {
                //===showing error in tostify====//
                toast.error(data.message, {
                    autoClose: 2000,
                })
            }
            else {
                navigate('/home')
            }
        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
        }
    }




    return (
        <div className="listing_section pb-16">
            <Slider {...settings} className='z-10 relative'>
                {
                    listings.imgUrl && listings.imgUrl.map((listing, index) => (
                        <div
                            key={index}
                            className="h-[300px] sm:h-[550px] w-full mx-auto z-10"
                        >
                            <img className='object-cover w-full h-full' src={listing} alt="image" />
                        </div>
                    ))
                }
            </Slider>
            <div className="container ">
                <div className="property_details_container pt-4 sm:pt-12 ">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        <div className="lg:col-span-7  ">
                            <div className='bg-white md:p-12 p-6 rounded-md shadow-md'>
                                <div className="property_info">
                                    <p className='font-heading text-brand-blue'>
                                        <span className='py-2 px-6 bg-brand-blue/40 rounded-full border border-brand-blue uppercase'>
                                            {type}
                                        </span>
                                    </p>

                                    <h1 className='font-heading font-bold mt-5 md:mt-8 text-2xl sm:text-3xl text-brand-blue capitalize'>
                                        {title}
                                    </h1>
                                    <p className='font-content mt-3 font-medium text-lg flex items-center justify-left'>
                                        <FaLocationArrow className='text-brand-blue' />
                                        <span className='ml-1'>
                                            {address}
                                        </span>
                                    </p>

                                    <div className="description">
                                        <p className='font-heading mt-4 font-medium text-lg sm:text-xl'>Description</p>
                                        <p className='font-content mt-1 font-medium text-xs sm:text-sm md:text-md lg:text-lg '>
                                            {description}
                                        </p>
                                    </div>

                                    {
                                        offer ?
                                            <p className='text-2xl font-heading text-brand-blue mt-5  text-bold'>
                                                ${discountPrice} <span>
                                                    <s className='text-gray-400 text-sm'>${price}</s>
                                                </span>
                                            </p>
                                            :
                                            <p className='text-2xl font-heading text-brand-blue mt-3  text-bold'>
                                                ${price}
                                            </p>
                                    }
                                </div>


                                <div className="property_genarel_info grid-cols-3 grid max-w-md">
                                    <p className='font-heading mt-3 font-medium sm:text-lg  text-sm flex items-center justify-left'>
                                        <FaBed className='text-brand-blue' />
                                        <span className='ml-1'>{bed} Beds</span>
                                    </p>
                                    <p className='font-heading mt-3 font-medium sm:text-lg  text-sm flex items-center justify-left'>
                                        <FaBath className='text-brand-blue' />
                                        <span className='ml-1'>{bath} Bath</span>
                                    </p>
                                    <p className='font-heading mt-3 font-medium sm:text-lg text-sm flex items-center justify-left'><BiSolidArea className='text-brand-blue' />
                                        <span className='ml-1'>{area} sqft</span>
                                    </p>
                                </div>

                            </div>


                            {/* Feature Content Section */}

                            <div className="property_details mt-8 bg-white rounded-md shadow-md md:px-12 py-5 px-6">
                                <div
                                    onClick={() => setIsFeatureActive(!isFeatureActive)}
                                    className="feature_heading flex items-center justify-between cursor-pointer"
                                >
                                    <p className='font-heading text-lg sm:text-xl font-extrabold'>Detail & Features</p>
                                    {
                                        isFeatureActive
                                            ?
                                            <i className='p-[5px] rounded-full bg-brand-blue/20 flex items-center justify-center'>
                                                <FaAngleUp className='text-xl' />
                                            </i>
                                            :
                                            <i className='p-[5px] rounded-full bg-brand-blue/20 flex items-center justify-center'>
                                                <FaAngleDown className='text-xl' />
                                            </i>
                                    }
                                </div>
                                <div className={`feature_info  transition-max-h ${isFeatureActive ? 'max-h-screen' : 'max-h-0'} overflow-hidden duration-500 ease-in-out`}>
                                    <div className="info_contaier mt-5 max-w-md ">
                                        <div className="grid grid-cols-2">
                                            <p className='font-heading text-md lg:text-lg '>
                                                Bedrooms
                                            </p>
                                            <p className='font-heading  text-md lg:text-lg '>
                                                {bed}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 mt-2">
                                            <p className='font-heading text-md lg:text-lg '>
                                                BathRoom
                                            </p>
                                            <p className='font-heading  text-md lg:text-lg '>
                                                {bath}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 mt-2">
                                            <p className='font-heading text-md lg:text-lg '>
                                                Parking
                                            </p>
                                            <p className={`font-heading ${parking ? "text-green-600" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                {
                                                    parking ? "Yes" : 'No'
                                                }
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 mt-2">
                                            <p className='font-heading text-md lg:text-lg '>
                                                Furnished
                                            </p>
                                            <p className={`font-heading ${furnished ? "text-green-600" : "text-gray-400"}  text-md lg:text-lg capitalize`}>
                                                {
                                                    furnished ? "Yes" : 'No'
                                                }
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 mt-2">
                                            <p className='font-heading text-md lg:text-lg '>
                                                Area
                                            </p>
                                            <p className='font-heading  text-md lg:text-lg '>
                                                {area} <span>sqft</span>
                                            </p>
                                        </div>
                                        {
                                            offer &&
                                            <div className="grid grid-cols-2 mt-2">
                                                <p className='font-heading text-md lg:text-lg '>
                                                    Price
                                                </p>
                                                <p className='font-heading  text-md lg:text-2xl '>
                                                    ${discountPrice} <span>
                                                        <s className='text-gray-400 text-lg'>${price}</s>
                                                    </span>
                                                </p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="lg:col-span-5">
                            <div className="bg-white md:p-12 p-6 rounded-md shadow-md">
                                <div className="post_owner grid grid-cols-2 gap-5">
                                    <div className="btn_container">
                                        <button
                                            onClick={() => navigate(`/update_post/${params.id}`)}
                                            className='bg-brand-blue text-white w-full px-12 py-3 text-xl font-heading rounded-sm'>
                                            Update Post
                                        </button>
                                    </div>
                                    <div className="contant_btn_container">
                                        <button
                                            onClick={() => handlePostDelete(params.id)}
                                            className='bg-red-600 text-white w-full px-12 py-3 text-xl font-heading rounded-sm'>
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ListingPage