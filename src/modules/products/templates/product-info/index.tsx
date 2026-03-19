import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="space-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 
          className="text-4xl font-medium tracking-tightest text-brand"
          data-testid="product-title"
        >
          {product.title}
        </h1>
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xsmall-regular uppercase tracking-widest text-brand-muted hover:text-brand transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
      </div>

      <p
        className="text-base-regular text-brand-muted leading-relaxed"
        data-testid="product-description"
      >
        {product.description}
      </p>
    </div>
  )
}

export default ProductInfo
