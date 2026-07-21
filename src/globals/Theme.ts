import type { GlobalConfig } from 'payload'
import { revalidate } from '../lib/revalidate'
import { BUILT_IN_COLORS, slugifyColor, isReservedSlug } from '../lib/colors'

const textOnOptions = [
  { label: 'Ink (dark text)', value: 'ink' },
  { label: 'Paper (light text)', value: 'paper' },
]

export const Theme: GlobalConfig = {
  slug: 'theme',
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidate(['/'])],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Palette',
          description: 'Retune the built-in named colors. Slugs are fixed.',
          fields: [
            {
              name: 'builtIns',
              type: 'array',
              admin: { description: 'One row per built-in color token.' },
              fields: [
                { name: 'slug', type: 'text', required: true, admin: { readOnly: true } },
                { name: 'label', type: 'text', required: true, admin: { readOnly: true } },
                { name: 'hex', type: 'text', required: true, admin: { description: 'e.g. #14a3a3' } },
                { name: 'textOn', type: 'select', required: true, defaultValue: 'ink', options: textOnOptions },
              ],
            },
          ],
        },
        {
          label: 'Custom Colors',
          fields: [
            {
              name: 'customColors',
              type: 'array',
              labels: { singular: 'Color', plural: 'Colors' },
              fields: [
                { name: 'label', type: 'text', required: true },
                {
                  name: 'slug',
                  type: 'text',
                  admin: { readOnly: true, description: 'Auto-generated from label.' },
                  hooks: {
                    beforeValidate: [
                      ({ siblingData }) => slugifyColor(String(siblingData?.label ?? '')),
                    ],
                  },
                  validate: (
                    value: unknown,
                    options: { data?: { customColors?: Array<{ label?: string | null }> | null } },
                  ) => {
                    const slug = String(value ?? '')
                    if (!slug) return 'Label must produce a valid slug.'
                    if (isReservedSlug(slug)) return `"${slug}" is a reserved built-in color name.`
                    const rows = options?.data?.customColors ?? []
                    const dupes = rows.filter((r) => slugifyColor(String(r?.label ?? '')) === slug).length
                    if (dupes > 1) return `Another custom color already uses the name "${slug}". Pick a distinct name.`
                    return true
                  },
                },
                { name: 'hex', type: 'text', required: true, admin: { description: 'e.g. #3355ff' } },
                { name: 'textOn', type: 'select', required: true, defaultValue: 'ink', options: textOnOptions },
              ],
            },
          ],
        },
        {
          label: 'Config',
          fields: [
            {
              name: 'brutalShadow',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Hard drop-shadow on panels. Turn off for a flat look.' },
            },
          ],
        },
      ],
    },
  ],
}

export const THEME_BUILT_IN_DEFAULTS = BUILT_IN_COLORS.map((c) => ({
  slug: c.slug,
  label: c.label,
  hex: c.hex,
  textOn: c.textOn,
}))
