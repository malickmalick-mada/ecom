import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="py-24">
      <div className="content-container">
        <div className="flex flex-col gap-y-4 mb-16">
          <p className="text-label">Shop All</p>
          <h1 className="text-display-2" data-testid="store-page-title">
            Our Furniture Collection
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-20">
          <div className="lg:col-span-3 border-r border-brand-border pr-12 h-fit sticky top-32">
            <RefinementList sortBy={sort} />
          </div>
          <div className="lg:col-span-9 pt-8 lg:pt-0">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
