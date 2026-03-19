import { Suspense } from "react"
import { ShoppingCart, User } from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border">
      <header className="relative h-20 mx-auto">
        <nav className="content-container flex items-center justify-between w-full h-full">
          <div className="flex-1 flex items-center gap-x-12">
            <div className="block md:hidden">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            <div className="hidden md:flex items-center gap-x-12">
              <LocalizedClientLink
                href="/store"
                className="text-label link-underline"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/search"
                className="text-label link-underline"
              >
                Search
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-xl font-bold tracking-tightest uppercase md:text-2xl"
              data-testid="nav-store-link"
            >
              Massproductions
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-12 h-full flex-1 justify-end">
            <div className="hidden md:flex items-center gap-x-12 h-full">
              <LocalizedClientLink
                className="relative flex items-center justify-center p-2 hover:text-brand-muted transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
              >
                <User size={20} strokeWidth={2} />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="relative flex items-center justify-center p-2 hover:text-brand-muted transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart size={20} strokeWidth={2} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    0
                  </span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
