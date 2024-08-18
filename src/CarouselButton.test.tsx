import {render, screen} from "@testing-library/react";
import CarouselButton from "./CarouselButton.tsx";

describe('CarouselButton', () => {
    it('should render a <button>', () => {
        render(<CarouselButton/>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});