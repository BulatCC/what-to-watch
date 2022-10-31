import { useState, useEffect } from 'react';

const useDebounce = <T> (value: T, delayTime: number): T => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebounced(value);
        }, delayTime);

        return () => {
            clearTimeout(timeOut);
        }
    });

    return debounced;
}

export { useDebounce };
