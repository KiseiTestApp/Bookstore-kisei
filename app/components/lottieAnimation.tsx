import Lottie from "lottie-web";
import {useEffect, useRef} from "react";

const LottieAnimation = () => {
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (container.current) {
            const animation = Lottie.loadAnimation({
                container: container.current,
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "/gif/Animation - 1742720662888.json",
            })
            return() => animation.destroy();
        }
    }, [])
    return (
        <div ref={container} style={{ width: "200px", height: "200px" }}>
        </div>
    )
}
export default LottieAnimation;