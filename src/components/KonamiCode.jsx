import { useEffect } from 'react';
import { useSecrets } from '../context/SecretsContext';

const KonamiCode = () => {
    const { unlockSecret } = useSecrets();

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
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [unlockSecret]);

    return null;
};

export default KonamiCode; 