import { Image } from "lucide-react";

interface ProductImageProps {
  thumbnail: string
}

export default function ProductImage({ thumbnail } : ProductImageProps) {
  return (
    <div className="h-48 w-48">
      {thumbnail ?
        <img className="w-full h-full" loading="lazy" src={thumbnail}/>
      :
        <div title="product-fallback-image">
          <Image className="w-full h-full"/>
        </div>
      }
    </div>
  );
}