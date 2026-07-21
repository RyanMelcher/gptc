import { getThemeData, themeCss } from '@/lib/theme'

// Server component: reads the Theme global and emits CSS variables that override
// the static @theme defaults in theme.css. Rendered once in the site layout.
export async function ThemeStyle() {
  const { colors, config } = await getThemeData()
  const css = themeCss(colors, config)
  return <style id="theme-vars" dangerouslySetInnerHTML={{ __html: css }} />
}
