'use client'

import type { TextFieldClientProps } from 'payload'
import { useField } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { BUILT_IN_COLORS } from '@/lib/colors'

type Option = { slug: string; label: string; hex: string }

const BUILT_IN_OPTIONS: Option[] = BUILT_IN_COLORS.map((c) => ({
  slug: c.slug,
  label: c.label,
  hex: c.hex,
}))

// Reads the Theme global via the REST API so the dropdown always reflects the
// current built-in + custom colors. Stores the selected color slug as a string.
export const ColorSelectField: React.FC<TextFieldClientProps> = ({ path, field }) => {
  const { value, setValue } = useField<string>({ path })
  // Start from the built-in palette so the picker is never empty (e.g. before the
  // theme global is seeded); the fetch below refines it with the live DB values.
  const [options, setOptions] = useState<Option[]>(BUILT_IN_OPTIONS)
  const label = typeof field?.label === 'string' ? field.label : 'Color'

  useEffect(() => {
    let cancelled = false
    fetch('/api/globals/theme?depth=0', { credentials: 'include' })
      .then((r) => r.json())
      .then((theme) => {
        if (cancelled) return
        const toOpt = (c: { slug?: string; label?: string; hex?: string }): Option => ({
          slug: c.slug ?? '',
          label: c.label ?? c.slug ?? '',
          hex: c.hex ?? 'transparent',
        })
        const builtIns: Option[] = (theme?.builtIns ?? []).map(toOpt).filter((o: Option) => o.slug)
        const custom: Option[] = (theme?.customColors ?? []).map(toOpt).filter((o: Option) => o.slug)
        // Fall back to the compiled built-ins if the global has no palette rows yet.
        setOptions([...(builtIns.length ? builtIns : BUILT_IN_OPTIONS), ...custom])
      })
      .catch(() => setOptions(BUILT_IN_OPTIONS))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="field-type">
      <label className="field-label" htmlFor={`field-${path}`}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <select
          id={`field-${path}`}
          value={value ?? ''}
          onChange={(e) => setValue(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        >
          <option value="">— Select a color —</option>
          {options.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
        {value ? (
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 24,
              height: 24,
              borderRadius: 3,
              border: '1px solid #0003',
              background: options.find((o) => o.slug === value)?.hex ?? 'transparent',
            }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default ColorSelectField
