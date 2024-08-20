import {render, screen} from "@testing-library/react";
import CarouselSlide, {ScaledImg} from "./CarouselSlide.tsx";
import styled from "styled-components";

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

    it('should use `imgHeight` as the height of the <img>', () => {
        render(<CarouselSlide imgHeight={"123px"}/>);
        expect(screen.getByRole("img")).toHaveStyleRule("height", "123px");
    });

    it('should allow styles to be overridden with `ImgComponent`', () => {
        const TestImg = styled(ScaledImg)`
            width: auto;
            object-fit: fill;
        `;
        render(<CarouselSlide ImgComponent={TestImg} imgHeight={250}/>);
        const img = screen.getByRole("img");
        expect(img).toHaveStyleRule("width", "auto");
        expect(img).toHaveStyleRule("height", "250px");
        expect(img).toHaveStyleRule("object-fit", "fill");
    });

    it('should match snapshot', () => {
        render(<CarouselSlide/>);
        expect(screen.getByRole("figure")).toMatchSnapshot();
    });
});