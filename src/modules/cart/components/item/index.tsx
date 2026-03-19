"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <div className="flex flex-col gap-y-4" data-testid="product-row">
      <div className="flex gap-x-6">
        <div className="w-24 shrink-0">
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className="block aspect-square"
          >
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
              className="h-full w-full object-cover"
            />
          </LocalizedClientLink>
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-brand" data-testid="product-title">
                {item.product_title}
              </h3>
              <div className="text-xsmall-regular text-brand-muted uppercase tracking-widest">
                <LineItemOptions variant={item.variant} data-testid="product-variant" />
              </div>
            </div>
            <div className="text-right">
              <LineItemPrice item={item} style="tight" currencyCode={currencyCode} />
            </div>
          </div>

          {type === "full" && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-x-4">
                <div className="flex items-center border border-brand-border px-3 py-1">
                  <span className="text-label mr-4">Qty</span>
                  <select
                    value={item.quantity}
                    onChange={(e) => changeQuantity(parseInt(e.target.value))}
                    className="bg-transparent text-xs font-medium outline-none cursor-pointer"
                    data-testid="product-select-button"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option value={i + 1} key={i}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <DeleteButton id={item.id} data-testid="product-delete-button" />
              </div>
              {updating && <Spinner className="animate-spin text-brand-muted" />}
            </div>
          )}
        </div>
      </div>
      <ErrorMessage error={error} data-testid="product-error-message" />
    </div>
  )
}

export default Item
