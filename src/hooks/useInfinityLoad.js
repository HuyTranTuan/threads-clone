import { useRef, useEffect, useCallback } from "react";

function useInfinityLoad({bottomOffset = 0, onEnd = () => {}} = {}){
    const isEnded = useRef(false);

    const handle = useCallback(() => {
        const isScrollEnd = document.documentElement.scrollHeight + bottomOffset - (window.innerHeight + window.scrollY);

        if(!isEnded.current && isScrollEnd <=1){
            isEnded.current = true;
            onEnd();
        } else if (isScrollEnd > 1){
            isEnded.current = false;
        }
    }, [bottomOffset, onEnd]);

    useEffect(() => {
        window.addEventListener("scroll", handle());
        return () => window.removeEventListener("scroll", handle);
    },[handle]);
}

export default useInfinityLoad;