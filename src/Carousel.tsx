import CarouselSlide from "./CarouselSlide.tsx";

type Slide = {
    imgUrl?: string,
    description?: string,
    attribution?: string,
};

const Carousel = ({slides}: { slides?: Slide[] }) => {
    return (
        <div data-testid={'carousel'}>
            <CarouselSlide {...slides?.[0]}/>
        </div>
    );
};

export default Carousel;