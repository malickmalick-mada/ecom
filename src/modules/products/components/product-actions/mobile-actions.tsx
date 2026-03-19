import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            className="bg-white/80 backdrop-blur-md flex flex-col gap-y-4 p-6 w-full border-t border-brand-border"
            data-testid="mobile-actions"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-1">
                <span className="text-sm font-medium text-brand" data-testid="mobile-title">
                  {product.title}
                </span>
                {selectedPrice && (
                  <div className="flex items-center gap-x-2">
                    <span className={clx("text-xs font-medium", {
                      "text-red-600": selectedPrice.price_type === "sale",
                      "text-brand": selectedPrice.price_type !== "sale",
                    })}>
                      {selectedPrice.calculated_price}
                    </span>
                    {selectedPrice.price_type === "sale" && (
                      <span className="line-through text-brand-muted text-[10px]">
                        {selectedPrice.original_price}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {!isSimple && (
                <button 
                  onClick={open} 
                  className="text-label link-underline pb-1 flex items-center gap-x-1"
                >
                  Options <ChevronDown className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!inStock || optionsDisabled || isAdding}
              className={clx("contrast-btn w-full py-4", {
                "opacity-50 cursor-not-allowed": !inStock || optionsDisabled || isAdding,
              })}
              data-testid="mobile-add-button"
            >
              {isAdding ? "Adding..." : !inStock ? "Out of stock" : "Add to cart"}
            </button>
          </div>
        </Transition>
      </div>

      <Transition show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="w-full bg-white p-8 border-t border-brand-border shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-label">Configure Product</p>
                    <button onClick={close}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-8 pb-12">
                    {(product.options || []).map((option) => (
                      <div key={option.id}>
                        <OptionSelect
                          option={option}
                          current={options[option.id]}
                          updateOption={updateOptions}
                          title={option.title ?? ""}
                          disabled={optionsDisabled}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart()
                      close()
                    }}
                    className="contrast-btn w-full py-4"
                  >
                    Confirm & Add
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
