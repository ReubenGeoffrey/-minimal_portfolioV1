import { introLinesByPersona } from '../constants'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useSecrets } from '../context/SecretsContext'
import KonamiCode from './KonamiCode'

gsap.registerPlugin(ScrollTrigger, SplitText);

const personas = [
    { id: 'default', label: 'Default' },
    { id: 'hr', label: 'HR' },
    { id: 'creative', label: 'Creative' },
    { id: 'interviewer', label: 'Interviewer' },
    { id: 'professional', label: 'Professional' },
    { id: 'client', label: 'Client' },
    { id: 'secret', label: '' }
];

const Hero = ({ wrapperRef }) => {
    const [activePersona, setActivePersona] = useState('default');
    const { unlockSecret } = useSecrets();
    const refs = useRef([]);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const helloRef = useRef(null);
    const splitInstance = useRef(null);

    const handlePersonaChange = (personaId) => {
        setActivePersona(personaId);
        if (personaId === 'secret') {
            unlockSecret('persona');
        }
    };

    const addRef = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const animateElements = () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        refs.current = [];

        if (splitInstance.current) {
            splitInstance.current.revert();
        }

        if (helloRef.current) {
            addRef(helloRef.current);
        }

        if (textRef.current) {
            textRef.current.textContent = introLinesByPersona[activePersona];
        }

        const width = window.innerWidth;
        const splitType = width < 768 ? 'lines,words' : 'lines';
        splitInstance.current = new SplitText(textRef.current, {
            type: splitType,
            linesClass: "split-line"
        });

        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.split-line');
            elements.forEach(el => addRef(el));
        }

        gsap.set(refs.current, {
            opacity: 0,
            filter: "blur(5px)",
            y: "30px",
        });

        refs.current.forEach((el, index) => {
            gsap.to(
                el, 
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: "0px",
                    ease: 'power2.inOut',
                    duration: 1,
                    delay: index * 0.2, 
                    scrollTrigger: {
                        trigger: el,  
                        start: 'top bottom', 
                        end: 'bottom 10%',
                        onLeave: () => {
                            gsap.to(el, {
                                opacity: 0,
                                filter: "blur(5px)",
                                y: "30px",
                                duration: 0.5,
                            });
                        },
                        onEnterBack: () => {
                            gsap.to(el, {
                                opacity: 1,
                                filter: "blur(0px)",
                                y: "0px",
                                duration: 0.5,
                            });
                        }
                    }
                }
            );
        });
    };

    useEffect(() => {
        const handleResize = () => {
            animateElements();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (splitInstance.current) {
                splitInstance.current.revert();
            }
        };
    }, []);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.textContent = introLinesByPersona[activePersona];
            animateElements();
        }
    }, [activePersona]);

    return (
        <div className='h-screen w-full flex flex-col items-center justify-center relative'>
            <KonamiCode wrapperRef={wrapperRef} />
            <div className='flex flex-col px-5 md:px-32' ref={containerRef}>
                <h1
                    ref={helloRef}
                    className='text-xl md:text-3xl text-white font-workSans h-full'
                >
                    {activePersona === 'secret' ? 'Yo,' : 'Hello,'}
                </h1>
                <div className='h-full w-full flex flex-col py-3'>
                    <div 
                        ref={textRef}
                        className='w-full text-white font-space font-thin text-3xl md:text-4xl lg:text-6xl'
                    >
                        {introLinesByPersona[activePersona]}
                    </div>
                </div>
            </div>
            
            <div className='absolute bottom-10 w-[90%] max-w-3xl mx-auto px-2'>
                <div className='flex flex-wrap justify-center gap-1 md:gap-2 bg-black/20 backdrop-blur-sm p-1.5 md:p-2 rounded-full overflow-x-auto scrollbar-hide'>
                    {personas.map((persona) => (
                        <button
                            key={persona.id}
                            onClick={() => handlePersonaChange(persona.id)}
                            className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                                activePersona === persona.id
                                    ? 'bg-white text-black font-medium'
                                    : 'text-white hover:bg-white/10'
                            }`}
                        >
                            {persona.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Hero; 