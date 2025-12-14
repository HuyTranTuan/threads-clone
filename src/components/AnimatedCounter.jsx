import { useRef, useEffect } from "react";

export default function AnimatedCounter({ value, className = "" }) {
    const prevValueRef = useRef(value);
    const isIncreasing = useRef(true);

    useEffect(() => {
        if (prevValueRef.current !== value) {
            isIncreasing.current = value > prevValueRef.current;
            prevValueRef.current = value;
        }
    }, [value]);

    if (value === 0) return null;

    return (
        <span className={`inline-block overflow-hidden relative h-5 ${className}`}>
            <span
                key={value}
                className={`block will-change-transform ${
                    isIncreasing.current ? "animate-slide-up" : "animate-slide-down"
                }`}
            >
                {value}
            </span>
        </span>
    );
}

