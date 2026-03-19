"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="py-8 space-y-8">
      <div className="grid grid-cols-2 gap-x-12">
        <div className="flex flex-col gap-y-6">
          <div className="space-y-1">
            <span className="text-label">Material</span>
            <p className="text-base-regular text-brand">{product.material || "Crafted with premium materials."}</p>
          </div>
          <div className="space-y-1">
            <span className="text-label">Origin</span>
            <p className="text-base-regular text-brand">{product.origin_country || "Handcrafted in Stockholm."}</p>
          </div>
          <div className="space-y-1">
            <span className="text-label">Type</span>
            <p className="text-base-regular text-brand">{product.type?.value || "Original Design."}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="space-y-1">
            <span className="text-label">Weight</span>
            <p className="text-base-regular text-brand">{product.weight ? `${product.weight} g` : "Standard Weight."}</p>
          </div>
          <div className="space-y-1">
            <span className="text-label">Dimensions</span>
            <p className="text-base-regular text-brand">
              {product.length && product.width && product.height
                ? `${product.length}L × ${product.width}W × ${product.height}H`
                : "Compact proportions."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-8 space-y-12">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="space-y-2">
          <span className="text-label">Shipping</span>
          <p className="text-base-regular text-brand-muted leading-relaxed max-w-sm">
            Efficient and sustainable delivery. Your order arrives within 3-7 business days, carefully packed to preserve the integrity of the design.
          </p>
        </div>
        <div className="space-y-2">
          <span className="text-label">Returns</span>
          <p className="text-base-regular text-brand-muted leading-relaxed max-w-sm">
            We value your satisfaction. If the design does not enrich your space, returns are accepted within 30 days of receipt.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
