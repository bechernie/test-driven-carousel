import {render, screen} from "@testing-library/react";
import Carousel from "./Carousel.tsx";

describe('Carousel', () => {
    it('should render a <div>', () => {
        render(<Carousel/>);
        expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    const slides = [
        {
            imgUrl: 'https://example.com/slide1.png',
            description: 'Slide 1',
            attribution: 'Uno Pizzeria',
        },
        {
            imgUrl: 'https://example.com/slide2.png',
            description: 'Slide 2',
            attribution: 'Dos Equis',
        },
        {
            imgUrl: 'https://example.com/slide3.png',
            description: 'Slide 3',
            attribution: 'Three Amigos',
        }
    ];

    it('should render the first slide by default', () => {
        render(<Carousel slides={slides}/>);
        expect(screen.getByRole('img')).toHaveAttribute('src', slides[0].imgUrl);
    });
});