import Image, {StaticImageData} from "next/image";

type SlideImageProps = {
    src: StaticImageData,
    alt: string;
}

export default function SlideImage({src, alt}: SlideImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            className='w-full h-full object-cover'
            fill
            loading="lazy"
            placeholder='blur'
        />
    )
}