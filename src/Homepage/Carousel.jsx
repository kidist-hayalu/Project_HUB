import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules';

function Carousel(){

    return(
        <div className='h-full'>
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            speed={1000}
            pagination={{clickable: true}}
            autoplay={{
                delay:3000,
                disableOnInteraction: false
            }} >
                <SwiperSlide>
                    <div className='flex flex-row items-center justify-center'>
                        <img src="/assets/person-working-html-computer.jpg" alt="Slide 1" className='w-4/5 h-full rounded-lg shadow-lg' />
                    </div>
                    </SwiperSlide>
                <SwiperSlide>
                    <div className='flex flex-row items-center justify-center'>
                        <img src="/assets/person-working-html-computer.jpg" alt="Slide 2" className='w-4/5 h-full rounded-lg shadow-lg' />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='flex flex-row items-center justify-center'>
                        <img src="/assets/person-working-html-computer.jpg" alt="Slide 3" className='w-4/5 h-full rounded-lg shadow-lg' />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='flex flex-row items-center justify-center'>
                        <img src="/assets/person-working-html-computer.jpg" alt="Slide 4" className='w-4/5 h-full rounded-lg shadow-lg' />
                    </div>
                    </SwiperSlide>

            </Swiper>
            </div>
    )
}

export default Carousel;