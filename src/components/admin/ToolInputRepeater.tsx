import { Button, Label, TextInput } from 'flowbite-react'
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi2'
import type { FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'
import type { PortfolioFormValues } from '../../types/portfolio'

interface ToolInputRepeaterProps {
  fields: Array<{ id: string }>
  register: UseFormRegister<PortfolioFormValues>
  errors: FieldErrors<PortfolioFormValues>
  append: UseFieldArrayAppend<PortfolioFormValues, 'tools'>
  remove: UseFieldArrayRemove
}

export function ToolInputRepeater({ fields, register, errors, append, remove }: ToolInputRepeaterProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-stone-200 bg-stone-50/70 p-5">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-base font-semibold text-stone-900">Tools</Label>
        <Button color="light" size="xs" onClick={() => append({ name: '' })}>
          <HiPlusCircle className="mr-2 h-4 w-4" />
          Add tool
        </Button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-3">
          <div className="flex-1">
            <TextInput placeholder="Figma" {...register(`tools.${index}.name`)} color={errors.tools?.[index]?.name ? 'failure' : undefined} />
            {errors.tools?.[index]?.name ? (
              <p className="mt-1 text-xs text-red-600">{errors.tools[index]?.name?.message}</p>
            ) : null}
          </div>
          <Button
            color="light"
            size="sm"
            disabled={fields.length === 1}
            onClick={() => remove(index)}
            aria-label="Remove tool"
          >
            <HiMinusCircle className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
