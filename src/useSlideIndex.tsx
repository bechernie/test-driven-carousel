import {useCallback, useRef, useState} from "react";
import {useTimeout} from "./useTimeout.tsx";

const decrement = (length: number) => (i: number) => (i + length - 1) % length;
const increment = (length: number) => (i: number) => (i + 1) % length;

export const useSlideIndex = (slides?: unknown[], slideIndexProp?: number, onSlideIndexChange?: (newSlideIndex: number) => void, autoAdvanceInterval?: number) => {
    const [slideIndexState, setSlideIndexState] = useState(0);
    const slideIndex = slideIndexProp ?? slideIndexState;
    const onSlideIndexChangeRef = useRef(onSlideIndexChange);
    onSlideIndexChangeRef.current = onSlideIndexChange;
    const decrementSlideIndex = () => {
        if (!slides) {
            return;
        }
        setSlideIndexState(decrement(slides.length));
        onSlideIndexChange?.(decrement(slides.length)(slideIndex));
    };
    const incrementSlideIndex = useCallback(() => {
        if (!slides?.length) {
            return;
        }
        setSlideIndexState(increment(slides.length));
        onSlideIndexChange?.(increment(slides.length)(slideIndex));
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [slides?.length, slideIndex]);
    useTimeout(incrementSlideIndex, autoAdvanceInterval);
    return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const;
};