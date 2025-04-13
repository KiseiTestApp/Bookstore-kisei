"use client"

// Các phụ thuộc UI
import {useCallback, useEffect, useState} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";

// Ảnh
import hero1 from '@/public/hero_images_opti/hero1.webp';
import hero2 from '@/public/hero_images_opti/hero2.webp';
import hero3 from '@/public/hero_images_opti/hero3.webp';
import hero4 from '@/public/hero_images_opti/hero4.webp';
import hero5 from '@/public/hero_images_opti/hero5.webp';

//Lazy loading SlideImage component
import dynamic from "next/dynamic";
const LazySlide = dynamic(() => import('@/app/components/SlideImage'), {
    ssr: false,
    loading: () => <div className='w-full h-full bg-gray-300 animate-pulse' />
})

export default function HeroImages() {
    const images = [
        {
            image: hero1,
            alt: "Slide 1"
        },
        {
            image: hero2,
            alt: "Slide 2"
        },
        {
            image: hero3,
            alt: "Slide 3"
        },
        {
            image: hero4,
            alt: "Slide 4"
        },
        {
            image: hero5,
            alt: "Slide 5"
        },
    ]
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay({delay: 3000})]);
    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(images.length).fill(false));

    useEffect(() => {
        setLoadedImages(prev => {
            const newLoaded = [...prev];
            newLoaded[0] = true;
            return newLoaded;
        })
    }, [])

    const handleSlideChange = useCallback(() => {
        if (!emblaApi) return;
        const selectedIndex = emblaApi.selectedScrollSnap();
        setLoadedImages(prev => {
            const newLoaded = [...prev];
            newLoaded[selectedIndex] = true;
            newLoaded[(selectedIndex + 1) % images.length] = true;
            newLoaded[(selectedIndex - 1 + images.length) % images.length] = true;
            return newLoaded;
        });
    }, [emblaApi, images.length]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", handleSlideChange);
        return () => {
            emblaApi.off("select", handleSlideChange);
            return undefined;
        }
    }, [emblaApi, handleSlideChange]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi]);
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi]);
    return (
        <div className="overflow-hidden relative w-full max-w-[100vw]" ref={emblaRef}>
            <div className="flex">
                {images.map((image, index) => (
                    <div key={index} className="relative flex-none w-full min-h-[300px]">
                        {loadedImages[index] ? (
                            <LazySlide src={image.image} alt={image.alt} />
                        ) : (
                            <div className='w-full h-full bg-gray-300 animate-pulse'></div>
                        )}
                    </div>
                ))}
            </div>
            <button
                className=" absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-xl transition-all delay-150 duration-150 ease-out hover:bg-white hover:text-gray-800"
                onClick={scrollPrev}
            >
                <ChevronLeft />
            </button>
            <button
                className=" absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-xl transition-all delay-150 duration-150 ease-out hover:bg-white hover:text-gray-800"
                onClick={scrollNext}
            >
                <ChevronRight />
            </button>
        </div>
    );
}