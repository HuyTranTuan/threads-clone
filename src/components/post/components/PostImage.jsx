import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function PostImage({ post }) {
  const image =
    post?.media_urls && post?.media_urls.length > 0 ? post.media_urls : null;
  const hasImage = image && image.length > 0;
  const hasMultipleImages = image && image.length > 1;
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  function handleMouseDown(index) {
    setSelectedImageIndex(index);
    document.body.style.cursor = "grabbing";
  }

  function handleMouseUp() {
    setSelectedImageIndex(null);
    document.body.style.cursor = "";
  }

  useEffect(() => {
    const handleWindowMouseUp = () => {
      setSelectedImageIndex(null);
      document.body.style.cursor = "";
    };

    if (selectedImageIndex !== null) {
      window.addEventListener("mouseup", handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [selectedImageIndex]);

  let imageSrc = null;

  if (hasMultipleImages) {
    imageSrc = (
      <Carousel className="w-full max-w-xl">
        <CarouselContent className="-ml-2">
          {image.map((img, index) => (
            <CarouselItem key={index} className="pl-2 basis-[320px]">
              <AspectRatio
                ratio={4 / 5}
                className="bg-content-background rounded-xl overflow-hidden"
              >
                <img
                  onMouseDown={() => handleMouseDown(index)}
                  onMouseUp={handleMouseUp}
                  src={img}
                  alt={`Post Image ${index + 1}`}
                  className={cn(
                    "w-full h-full object-cover rounded-xl transition-transform duration-200 cursor-grab",
                    index === selectedImageIndex ? "scale-95" : "scale-100",
                  )}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  } else if (hasImage) {
    imageSrc = (
      <div className="w-[320px]">
        <AspectRatio
          ratio={4 / 5}
          className="rounded-xl overflow-hidden border border-border"
        >
          <img
            src={image}
            alt="Post Image"
            className="w-full h-full no-drag object-cover cursor-pointer"
          />
        </AspectRatio>
      </div>
    );
  }

  return imageSrc;
}

export default PostImage;
