import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { FadeIn } from "@modules/common/components/fade-in"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="py-24 border-t border-brand-border">
      <div className="content-container">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <p className="text-label">Collection</p>
              <h2 className="text-display-2">{collection.title}</h2>
            </div>
            <InteractiveLink href={`/collections/${collection.handle}`} className="text-label link-underline pb-1">
              View all
            </InteractiveLink>
          </div>
        </FadeIn>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-grid">
          {pricedProducts &&
            pricedProducts.slice(0, 4).map((product, index) => (
              <li key={product.id}>
                <FadeIn delay={index * 0.1}>
                  <ProductPreview product={product} region={region} isFeatured />
                </FadeIn>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
