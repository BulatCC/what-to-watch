import { useLocation } from 'react-router';
import { useEffect } from 'react';

const useScrollTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
}

export { useScrollTop };