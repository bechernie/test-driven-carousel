import Carousel from "../Carousel.tsx";
import { StoryObj } from "@storybook/react";
import slides from "../examples/slides.tsx";

const meta = {
  title: "Example/Carousel",
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: {
    slides,
  },
};
