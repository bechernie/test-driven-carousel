import CarouselSlide from "./CarouselSlide.tsx";
import CarouselButton from "./CarouselButton.tsx";
import {ReactNode, useState} from "react";

type Slide = {
    imgUrl?: string,
    description?: ReactNode,
    attribution?: ReactNode,
};

const Carousel = ({slides}: { slides?: Slide[] }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    return (
        <div data-testid={'carousel'}>
            <CarouselSlide {...slides?.[slideIndex]}/>
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