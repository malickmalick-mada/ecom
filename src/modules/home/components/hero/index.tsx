import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FadeIn } from "@modules/common/components/fade-in"

const Hero = () => {
  return (
    <div className="relative h-screen w-full bg-brand-bg overflow-hidden flex items-center">
      <div className="content-container z-10 w-full">
        <div className="max-w-5xl space-y-12">
          <FadeIn delay={0.1}>
            <p className="text-label text-brand-muted">New Collection 2026</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-display-1">
              Functional design for modern living.
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 pt-12">
              <LocalizedClientLink href="/store">
                <button className="contrast-btn">Explore Collection</button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/about">
                <button className="secondary-btn">Our Story</button>
              </LocalizedClientLink>
            </div>
          </FadeIn>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[#F9F9F9]" />
    </div>
  )
}

export default Hero
