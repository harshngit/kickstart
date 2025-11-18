'use client' // If you're using Next.js 13+

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Scrollup = () => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShow(true)
			} else {
				setShow(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	if (!show) return null

	return (
		<div
			onClick={scrollToTop}
			className='fixed bottom-5 right-3 bg-[#1666B6]  hover:bg-secondary xl:w-[80px] xl:h-[80px] md:w-[60px] md:h-[60px] h-[40px] w-[40px]
			 rounded-full p-[12px] cursor-pointer flex justify-center items-center z-50 shadow-lg'
		>
			<Image
				src={"/asset/up.png"}
				width={30}
				height={30}
				alt="Scroll to top"
			/>
		</div>
	)
}

export default Scrollup
