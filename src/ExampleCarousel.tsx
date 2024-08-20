import slides from "./examples/slides.tsx";
import Carousel from "./Carousel.tsx";

const ExampleCarousel = () => {
    return <Carousel slides={slides} defaultImgHeight={500}/>;
}

export default ExampleCarousel;