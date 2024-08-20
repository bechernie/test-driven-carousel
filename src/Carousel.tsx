import CarouselSlide, {CarouselSlideProps} from "./CarouselSlide.tsx";
import CarouselButton from "./CarouselButton.tsx";
import {ReactNode, useState} from "react";

type Slide = {
    imgUrl?: string,
    description?: ReactNode,
    attribution?: ReactNode,
};

export type CarouselProps = {
    slides?: Slide[],
    defaultImgHeight?: CarouselSlideProps["imgHeight"],
};

const Carousel = ({slides, defaultImgHeight}: CarouselProps) => {
    const [slideIndex, setSlideIndex] = useState(0);

    return (
        <div data-testid={'carousel'}>
            <CarouselSlide imgHeight={defaultImgHeight} {...slides?.[slideIndex]}/>
            <CarouselButton data-testid={'previous-button'}
                            onClick={() => {
                                if (!slides) {
                                    return;
                                }
                                setSlideIndex(prevState => (prevState + slides.length - 1) % slides.length);
                            }}>
                Previous
            </CarouselButton>
            <CarouselButton data-testid={'next-button'}
                            onClick={() => {
                                if (!slides) {
                                    return;
                                }
                                setSlideIndex(prevState => (prevState + 1) % slides.length);
                            }}
            >
                Next
            </CarouselButton>
        </div>
    );
};

export default Carousel;