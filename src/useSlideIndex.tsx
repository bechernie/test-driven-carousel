import {useState} from "react";

export const useSlideIndex = (slides?: unknown[]) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const decrementSlideIndex = () => {
        if (!slides) {
            return;
        }
        setSlideIndex(prevState => (prevState + slides.length - 1) % slides.length);
    };
    const incrementSlideIndex = () => {
        if (!slides) {
            return;
        }
        setSlideIndex(prevState => (prevState + 1) % slides.length);
    };
    return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const;
};