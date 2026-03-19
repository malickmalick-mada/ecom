import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block w-full">
      <div data-testid="product-wrapper" className="flex flex-col gap-y-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 transition-colors duration-500 group-hover:bg-gray-100">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium tracking-tight text-brand group-hover:brand-muted transition-colors duration-300" data-testid="product-title">
              {product.title}
            </h3>
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <p className="text-xsmall-regular text-brand-muted uppercase tracking-widest">
            {product.collection?.title || "Original"}
          </p>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
