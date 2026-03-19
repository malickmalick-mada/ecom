import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import EditorialSection from "@modules/home/components/editorial"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Massproductions | Functional design for modern living",
  description:
    "Massproductions creates furniture and accessories that enrich design culture, drawing inspiration from the factory as both a production tool and a creative muse.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <EditorialSection 
        title="Symbiotic Production"
        description="Massproductions view industrial production and design as symbiotic. It's their appreciation for high-volume production that informs their innovative work."
        image="https://www.massproductions.se/wp-content/uploads/2021/05/massproductions-about-1.jpg"
        link="/about"
      />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <EditorialSection 
        title="The Beauty of Efficiency"
        description="Launching a new product into a crowded world is a serious responsibility - one they meet with passion and a commitment to quality."
        image="https://www.massproductions.se/wp-content/uploads/2021/05/massproductions-about-2.jpg"
        link="/about"
        reverse
      />
    </>
  )
}
