import { FadeIn } from "@modules/common/components/fade-in"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EditorialSection = ({ 
  title, 
  description, 
  image, 
  link, 
  reverse = false 
}: { 
  title: string
  description: string
  image: string
  link: string
  reverse?: boolean
}) => {
  return (
    <div className="py-24 border-t border-brand-border overflow-hidden">
      <div className="content-container">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
          <FadeIn direction={reverse ? "right" : "left"} className={reverse ? "md:order-2" : ""}>
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          </FadeIn>
          
          <FadeIn direction={reverse ? "left" : "right"} className={`space-y-8 ${reverse ? "md:order-1" : ""}`}>
            <div className="space-y-4">
              <p className="text-label">Editorial</p>
              <h2 className="text-display-2">{title}</h2>
            </div>
            <p className="text-base-regular text-brand-muted leading-relaxed max-w-md">
              {description}
            </p>
            <LocalizedClientLink href={link} className="inline-block text-label link-underline pb-1">
              Read More
            </LocalizedClientLink>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

export default EditorialSection
