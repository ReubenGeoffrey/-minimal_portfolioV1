import { useEffect, useState, useRef } from 'react';
import { useSecrets } from '../context/SecretsContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KonamiCode = ({ wrapperRef }) => {
    const { unlockSecret } = useSecrets();
    const [touchSequence, setTouchSequence] = useState([]);
    const [isInverted, setIsInverted] = useState(false);
    const touchStartY = useRef(null);
    const touchStartX = useRef(null);
    const lastTouchTime = useRef(0);
    const SWIPE_THRESHOLD = 50;
    const DOUBLE_TAP_DELAY = 300;

    const toggleRotation = () => {
        setIsInverted(prev => !prev);
        
        if (!wrapperRef.current) return;

        gsap.to(wrapperRef.current, {
            rotation: isInverted ? 0 : 180,
            duration: 1,
            ease: "power2.inOut",
            transformOrigin: "center center",
            onComplete: () => {
                ScrollTrigger.getAll().forEach(trigger => {
                    trigger.refresh();
                });
            }
        });
    };

    useEffect(() => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            const expectedKey = konamiCode[konamiIndex].toLowerCase();

            if (key === expectedKey) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    unlockSecret('konami');
                    toggleRotation();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            if (!touchStartY.current || !touchStartX.current) return;

            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            const deltaY = touchStartY.current - touchEndY;
            const deltaX = touchStartX.current - touchEndX;
            const currentTime = new Date().getTime();
            
            let gesture = '';
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
                    gesture = deltaY > 0 ? 'ArrowUp' : 'ArrowDown';
                }
            } else {
                if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
                    gesture = deltaX > 0 ? 'ArrowLeft' : 'ArrowRight';
                }
            }

            if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                if (currentTime - lastTouchTime.current < DOUBLE_TAP_DELAY) {
                    gesture = touchSequence.length % 2 === 0 ? 'b' : 'a';
                }
                lastTouchTime.current = currentTime;
            }

            if (gesture) {
                const newSequence = [...touchSequence, gesture];
                setTouchSequence(newSequence);

                const matchesKonamiCode = newSequence.every((gesture, index) => 
                    gesture.toLowerCase() === konamiCode[index].toLowerCase()
                );

                if (matchesKonamiCode && newSequence.length === konamiCode.length) {
                    unlockSecret('konami');
                    toggleRotation();
                    setTouchSequence([]);
                } else if (newSequence.length >= konamiCode.length) {
                    setTouchSequence([]);
                }
            }

            touchStartY.current = null;
            touchStartX.current = null;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [unlockSecret, touchSequence, isInverted]);

    useEffect(() => {
        const handleToggleShortcut = (e) => {
            if (e.key === 'Escape') {
                toggleRotation();
            }
        };

        window.addEventListener('keydown', handleToggleShortcut);
        return () => window.removeEventListener('keydown', handleToggleShortcut);
    }, [isInverted]);

    return null;
};

export default KonamiCode; 