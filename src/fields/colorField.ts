import type { Field, TextField } from 'payload'

// A text field storing a color slug, edited via the ColorSelectField dropdown.
export function colorField(name = 'color', overrides: Partial<TextField> = {}): Field {
  const { admin: adminOverrides, ...rest } = overrides

  return {
    name,
    type: 'text',
    ...rest,
    admin: {
      ...adminOverrides,
      components: {
        ...adminOverrides?.components,
        Field: '@/components/admin/ColorSelectField#ColorSelectField',
      },
    },
  } as Field
}
