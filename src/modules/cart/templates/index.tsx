import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-24">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="space-y-16">
            <div className="flex flex-col gap-y-4">
              <p className="text-label">Shopping Bag</p>
              <h1 className="text-display-2">Review your selection.</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-20">
              <div className="lg:col-span-8 flex flex-col gap-y-12">
                {!customer && (
                  <div className="p-8 bg-gray-50 border border-brand-border">
                    <SignInPrompt />
                  </div>
                )}
                <ItemsTemplate cart={cart} />
              </div>
              
              <div className="lg:col-span-4 mt-12 lg:mt-0">
                <div className="sticky top-32 space-y-8">
                  <div className="p-8 bg-gray-50 border border-brand-border">
                    <Summary cart={cart as any} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
