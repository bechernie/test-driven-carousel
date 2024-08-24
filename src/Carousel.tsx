import CarouselSlide, {CarouselSlideProps} from "./CarouselSlide.tsx";
import CarouselButton from "./CarouselButton.tsx";
import {ReactNode} from "react";
import {useSlideIndex} from "./useSlideIndex.tsx";

type Slide = {
    imgUrl?: string,
    description?: ReactNode,
    attribution?: ReactNode,
};

export type CarouselProps = {
    slides?: Slide[],
    slideIndex?: number,
    onSlideIndexChange?: (newSlideIndex: number) => void,
    autoAdvanceInterval?: number,
    DefaultImgComponent?: CarouselSlideProps["ImgComponent"],
    defaultImgHeight?: CarouselSlideProps["imgHeight"],
};

const Carousel = ({
                      slides,
                      slideIndex: slideIndexProp,
                      onSlideIndexChange,
                      autoAdvanceInterval,
                      DefaultImgComponent,
                      defaultImgHeight,
                  }: CarouselProps) => {
    const [slideIndex, decrementSlideIndex, incrementSlideIndex] = useSlideIndex(slides, slideIndexProp, onSlideIndexChange, autoAdvanceInterval);

    return (
        <div data-testid={'carousel'}>
            <CarouselSlide ImgComponent={DefaultImgComponent} imgHeight={defaultImgHeight} {...slides?.[slideIndex]}/>
            <CarouselButton data-testid={'previous-button'} onClick={decrementSlideIndex}>
                Previous
            </CarouselButton>
            <CarouselButton data-testid={'next-button'} onClick={incrementSlideIndex}>
                Next
            </CarouselButton>
        </div>
    );
};

export default Carousel;