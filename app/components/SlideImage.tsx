import Image, {StaticImageData} from "next/image";

type SlideImageProps = {
    src: StaticImageData,
    alt: string;
    loading?: 'lazy' | 'eager'
}

export default function SlideImage({src, alt, loading}: SlideImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            objectFit="cover"
            fill
            loading={loading}
            placeholder='blur'
        />
    )
}