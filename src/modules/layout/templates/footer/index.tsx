import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-brand text-white py-24 border-t border-brand-border">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="space-y-8">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-medium tracking-tightest uppercase"
            >
              Massproductions
            </LocalizedClientLink>
            <p className="text-xsmall-regular text-brand-muted max-w-xs uppercase tracking-widest leading-relaxed">
              Functional design for modern living. Created with passion in Stockholm since 2009.
            </p>
          </div>
          
          <div className="space-y-6">
            <p className="text-label text-brand-muted">Shop</p>
            <ul className="space-y-4">
              {productCategories?.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    href={`/categories/${c.handle}`}
                    className="text-sm link-underline pb-1"
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
              <li>
                <LocalizedClientLink href="/store" className="text-sm link-underline pb-1">
                  View All
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-label text-brand-muted">Company</p>
            <ul className="space-y-4">
              <li><LocalizedClientLink href="/about" className="text-sm link-underline pb-1">About</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/contact" className="text-sm link-underline pb-1">Contact</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/terms" className="text-sm link-underline pb-1">Terms</LocalizedClientLink></li>
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-label text-brand-muted">Newsletter</p>
            <div className="flex flex-col gap-y-4">
              <p className="text-xsmall-regular text-brand-muted uppercase tracking-widest">Stay updated with our latest releases.</p>
              <div className="flex border-b border-brand-muted pb-2">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent border-none outline-none text-xs w-full uppercase tracking-widest"
                />
                <button className="text-label link-underline pb-1">Join</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-y-4">
          <p className="text-[10px] text-brand-muted uppercase tracking-widest">
            © {new Date().getFullYear()} Massproductions AB. All rights reserved.
          </p>
          <div className="flex gap-x-8">
            <a href="#" className="text-[10px] text-brand-muted hover:text-white uppercase tracking-widest transition-colors">Instagram</a>
            <a href="#" className="text-[10px] text-brand-muted hover:text-white uppercase tracking-widest transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
