import { Metadata } from "next"
import { FadeIn } from "@modules/common/components/fade-in"

export const metadata: Metadata = {
  title: "About | Massproductions",
  description: "The beauty of efficient and sustainable production.",
}

export default function AboutPage() {
  return (
    <div className="py-24">
      <div className="content-container">
        <div className="max-w-4xl space-y-24">
          <FadeIn className="space-y-8">
            <p className="text-label">Our Story</p>
            <h1 className="text-display-1">
              Functional design for modern living.
            </h1>
            <p className="text-base-regular text-brand-muted leading-relaxed text-xl">
              Massproductions creates furniture and accessories that enrich design culture, drawing inspiration from the factory as both a production tool and a creative muse.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="aspect-[16/9] bg-gray-50 overflow-hidden">
            <div className="w-full h-full bg-[url('https://www.massproductions.se/wp-content/uploads/2021/05/massproductions-about-1.jpg')] bg-cover bg-center" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <FadeIn delay={0.3} className="space-y-8">
              <h2 className="text-display-2">Symbiotic Production.</h2>
              <p className="text-base-regular text-brand-muted leading-relaxed">
                Founded in 2009 by Swede Magnus Elebäck and Brit Chris Martin, Massproductions is built on their friendship and complementary skills. Magnus and Chris view industrial production and design as symbiotic. It's their appreciation for high-volume production that informs their innovative work.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="space-y-8 pt-12 md:pt-24">
              <p className="text-base-regular text-brand-muted leading-relaxed">
                For Massproductions, launching a new product into a crowded world is a serious responsibility - one they meet with passion and a commitment to quality that always justifies the result. Over the years they have developed an exciting and even audacious collection. Yet each piece remains practical and relevant.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
