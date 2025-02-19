import { Image } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselNext, 
  CarouselPrevious,
  CarouselItem
} from "../ui/carousel";
import { useState } from "react";

interface ProductDetailsGalleryProps {
  productImages: Array<string> | undefined
  productThumbnail: string | undefined
}

export default function ProductDetailsGallery({ 
  productImages, 
  productThumbnail 
} : ProductDetailsGalleryProps ) {

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleOnLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Carousel title="product-gallery" className="flex justify-self-center">        
      <CarouselContent 
        title="product-images" 
        className="h-64 w-64 2xl:w-96 2xl:h-96"
      >
        {productImages?.map((image, index) => (
          <CarouselItem key={index}>
            <img 
              className="h-full w-full object-contain"
              loading={index === 0 ? "eager" : "lazy"}
              onLoad={() => handleOnLoad()}
              src={imageLoaded ? image : productThumbnail} 
            />
          </CarouselItem>
        ))}
        {!productImages?.length &&
          <CarouselItem >
            <Image className="h-full w-full object-contain" width="10px" height="10px" />
          </CarouselItem>
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}