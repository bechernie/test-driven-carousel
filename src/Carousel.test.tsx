import {render, screen} from "@testing-library/react";
import Carousel from "./Carousel.tsx";
import {userEvent} from "@testing-library/user-event";
import {beforeEach} from "vitest";

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

describe('Carousel', () => {
    it('should render a <div>', () => {
        render(<Carousel/>);
        expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    it('should render the first slide by default', () => {
        render(<Carousel slides={slides}/>);
        expect(screen.getByRole('img')).toHaveAttribute('src', slides[0].imgUrl);
    });

    it('should advance the slide when the next button is clicked', async () => {
        render(<Carousel slides={slides}/>);
        const img = screen.getByRole('img');
        const nextButton = screen.getByTestId('next-button');
        const user = userEvent.setup();

        await user.click(nextButton);
        expect(img).toHaveAttribute('src', slides[1].imgUrl);
        await user.click(nextButton);
        expect(img).toHaveAttribute('src', slides[2].imgUrl);
        await user.click(nextButton);
        expect(img).toHaveAttribute('src', slides[0].imgUrl);
    });

    it('should reverse the slide when the previous button is clicked', async () => {
        render(<Carousel slides={slides}/>);
        const img = screen.getByRole('img');
        const previousButton = screen.getByTestId('previous-button');
        const user = userEvent.setup();

        await user.click(previousButton);
        expect(img).toHaveAttribute('src', slides[2].imgUrl);
        await user.click(previousButton);
        expect(img).toHaveAttribute('src', slides[1].imgUrl);
        await user.click(previousButton);
        expect(img).toHaveAttribute('src', slides[0].imgUrl);
    });

    it('should pass `DefaultImgComponent` to the `CarouselSlide`', () => {
        const DefaultImgComponent = () => <img data-testid={"Test image"}/>
        render(<Carousel slides={slides} DefaultImgComponent={DefaultImgComponent}/>);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("data-testid", "Test image");
    });

    it('should pass the `defaultImgHeight` to the `CarouselSlide`', () => {
        const defaultImgHeight = 123;
        render(<Carousel slides={slides} defaultImgHeight={defaultImgHeight}/>);
        const img = screen.getByRole("img");
        expect(img).toHaveStyleRule("height", "123px");
    });
});

describe('with controlled slideIndex', () => {
    const onSlideIndexChange = vi.fn();
    const renderCarouselWithSlideIndex = () => {
        render(<Carousel slides={slides} slideIndex={1} onSlideIndexChange={onSlideIndexChange}/>);
    };

    beforeEach(() => {
        onSlideIndexChange.mockReset();
    });

    it('should show the slide corresponding to the slideIndex', () => {
        renderCarouselWithSlideIndex();
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", slides[1].imgUrl);
    });

    it('should call onSlideIndexChange when previous <button> is clicked', async () => {
        renderCarouselWithSlideIndex();
        const img = screen.getByRole("img");
        const previousButton = screen.getByTestId("previous-button");
        const user = userEvent.setup();

        await user.click(previousButton);

        expect(img).toHaveAttribute("src", slides[1].imgUrl);
        expect(onSlideIndexChange).toHaveBeenCalledWith(0);
    });

    it('should call onSlideIndexChange when next <button> is clicked', async () => {
        renderCarouselWithSlideIndex();
        const img = screen.getByRole("img");
        const previousButton = screen.getByTestId("next-button");
        const user = userEvent.setup();

        await user.click(previousButton);

        expect(img).toHaveAttribute("src", slides[1].imgUrl);
        expect(onSlideIndexChange).toHaveBeenCalledWith(2);
    });
});