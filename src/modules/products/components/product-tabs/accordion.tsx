import { Text, clx } from "@medusajs/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "border-brand-border group border-t last:mb-0 last:border-b",
        "py-6",
        className
      )}
    >
      <AccordionPrimitive.Header>
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <AccordionPrimitive.Trigger className="flex-1 text-left">
              <span className="text-label text-brand hover:text-brand-muted transition-colors duration-200">
                {title}
              </span>
            </AccordionPrimitive.Trigger>
            <AccordionPrimitive.Trigger>
              {customTrigger || <MorphingTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <span className="text-xsmall-regular text-brand-muted mt-2 uppercase tracking-widest">
              {subtitle}
            </span>
          )}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          "radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none"
        )}
      >
        <div className="pt-4 inter-base-regular group-radix-state-closed:animate-accordion-close">
          {description && <p className="text-base-regular text-brand-muted mb-4">{description}</p>}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const MorphingTrigger = () => {
  return (
    <div className="group relative p-2">
      <div className="h-4 w-4 flex items-center justify-center">
        <span className="bg-brand group-radix-state-open:rotate-90 absolute h-[1px] w-full duration-500 ease-out" />
        <span className="bg-brand group-radix-state-open:rotate-90 group-radix-state-open:opacity-0 absolute h-full w-[1px] duration-500 ease-out" />
      </div>
    </div>
  )
}

export default Accordion
