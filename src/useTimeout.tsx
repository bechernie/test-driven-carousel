export const useTimeout = (
    callback: () => void,
    delay?: number,
) => {
    useEffect(() => {
        if (!delay) {
            return;
        }
        const timeout = setTimeout(callback, delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [delay, callback]);
};

import {useEffect} from "react";
