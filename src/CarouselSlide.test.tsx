import {render, screen} from "@testing-library/react";
import CarouselSlide from "./CarouselSlide.tsx";

describe('CarouselSlide', () => {
    it('should render a <figure>', () => {
        render(<CarouselSlide/>);
        expect(screen.getByRole('figure')).toBeInTheDocument();
    });

    it('should render an <img> and a <figcaption>', () => {
        render(<CarouselSlide/>);
        const figure = screen.getByRole('figure');
        const img = screen.getByRole('img');
        const figcaption = screen.getByTestId('caption');
        expect(figure).toContainElement(img);
        expect(figure).toContainElement(figcaption);
    });

    it('should pass `imgUrl` through to the <img>', () => {
        const imgUrl = 'https://example.com/image.png';
        render(<CarouselSlide imgUrl={imgUrl}/>);
        expect(screen.getByRole('img')).toHaveAttribute('src', imgUrl);
    });

    it('should use `description` and `attribution` as the caption', () => {
        const props = {
            description: 'A jaw-droppingly spectacular image',
            attribution: 'Trevor Burnham',
        };
        render(<CarouselSlide {...props}/>);
        const figcaption = screen.getByTestId('caption');
        expect(figcaption).toHaveTextContent(`${props.description} ${props.attribution}`);
    });

    it('should pass other props through to the <figure>', () => {
        const props = {
            className: 'my-carousel-slide',
            'data-test-name': 'My slide',
        };
        render(<CarouselSlide {...props}/>);
        const figure = screen.getByRole('figure');
        expect(figure).toHaveClass('my-carousel-slide');
        expect(figure).toHaveAttribute('data-test-name', 'My slide');
    });
});