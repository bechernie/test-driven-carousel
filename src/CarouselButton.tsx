import {ComponentPropsWithRef} from "react";

const CarouselButton = (props: ComponentPropsWithRef<'button'>) => {
    return (
        <button {...props}/>
    );
};

export default CarouselButton;