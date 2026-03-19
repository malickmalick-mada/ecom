import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { FadeIn } from "@modules/common/components/fade-in"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      {images.map((image, index) => {
        return (
          <FadeIn key={image.id} delay={index * 0.1} direction="none">
            <div
              className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 1}
                  className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </FadeIn>
        )
      })}
    </div>
  )
}

export default ImageGallery
