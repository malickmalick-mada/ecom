import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-6">
      <span className="text-label text-brand-muted">{title}</span>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange} value={value} className="flex flex-col gap-y-3">
        {items?.map((i) => (
          <div
            key={i.value}
            className="flex items-center gap-x-2"
          >
            <RadioGroup.Item
              checked={i.value === value}
              className="hidden"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "text-sm hover:cursor-pointer transition-colors duration-200",
                {
                  "text-brand font-medium": i.value === value,
                  "text-brand-muted hover:text-brand": i.value !== value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
