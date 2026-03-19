import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 py-24" data-testid="account-page">
      <div className="content-container">
        <div className="flex flex-col gap-y-4 mb-16">
          <p className="text-label">Account</p>
          <h1 className="text-display-2">Welcome back, {customer?.first_name || "Guest"}.</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-20">
          <div className="lg:col-span-3 border-r border-brand-border pr-12 h-fit sticky top-32">
            {customer && <AccountNav customer={customer} />}
          </div>
          <div className="lg:col-span-9 pt-8 lg:pt-0">{children}</div>
        </div>

        <div className="mt-32 pt-24 border-t border-brand-border flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="max-w-md space-y-4">
            <h3 className="text-2xl font-medium tracking-tight">Need assistance?</h3>
            <p className="text-base-regular text-brand-muted">
              Our customer service team is here to help with any questions regarding your orders, products, or account.
            </p>
          </div>
          <LocalizedClientLink href="/contact" className="text-label link-underline pb-1">
            Contact Support
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
