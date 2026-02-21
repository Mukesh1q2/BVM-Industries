import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface RevealSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const RevealSection = ({ children, className = '', delay = 0 }: RevealSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const defaultThreshold = 0.15; // Trigger when 15% visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing once revealed
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            {
                threshold: defaultThreshold,
                rootMargin: '50px 0px -50px 0px' // Adjusts the trigger area slightly
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out fill-mode-forwards opacity-0 translate-y-8 ${isVisible ? 'opacity-100 translate-y-0' : ''
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default RevealSection;
