import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import { FadeIn } from "@modules/common/components/fade-in"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col lg:flex-row lg:items-start py-12 gap-x-12 relative"
        data-testid="product-container"
      >
        <div className="flex flex-col lg:sticky lg:top-32 lg:max-w-[360px] w-full gap-y-12">
          <div className="space-y-4">
            <p className="text-label">Product</p>
            <ProductInfo product={product} />
          </div>
          <ProductTabs product={product} />
        </div>
        
        <div className="flex-1 w-full">
          <ImageGallery images={images} />
        </div>

        <div className="flex flex-col lg:sticky lg:top-32 lg:max-w-[360px] w-full gap-y-12">
          <div className="space-y-4">
            <p className="text-label">Purchase</p>
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>
      
      <div
        className="border-t border-brand-border mt-24 pt-24 pb-32"
        data-testid="related-products-container"
      >
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
            <FadeIn className="space-y-8">
              <p className="text-label">Design Story</p>
              <h2 className="text-display-2">The Beauty of Efficient Production.</h2>
              <p className="text-base-regular text-brand-muted leading-relaxed max-w-md">
                Massproductions creates furniture and accessories that enrich design culture, drawing inspiration from the factory as both a production tool and a creative muse.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="aspect-[4/5] bg-gray-50 overflow-hidden">
              <div className="w-full h-full bg-[url('https://www.massproductions.se/wp-content/uploads/2021/05/massproductions-about-1.jpg')] bg-cover bg-center" />
            </FadeIn>
          </div>

          <div className="mb-12">
            <p className="text-label">Related</p>
            <h2 className="text-display-2">You might also like</h2>
          </div>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
