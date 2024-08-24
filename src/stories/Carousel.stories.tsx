import Carousel from "../Carousel.tsx";
import { StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
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
  render: function RenderCarousel(args) {
    const [, updateArgs] = useArgs();
    return (
      <Carousel
        {...args}
        onSlideIndexChange={(newSlideIndex) => {
          updateArgs({ slideIndex: newSlideIndex });
          args.onSlideIndexChange?.(newSlideIndex);
        }}
      />
    );
  },
};
