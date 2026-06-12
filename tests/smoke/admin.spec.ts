import { test, expect } from '@playwright/test'

test('homepage renders brutalist hero', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('GREAT PLAINS')
})

test('admin login page loads', async ({ page }) => {
  await page.goto('/admin/login')
  await expect(page.locator('form')).toBeVisible()
})

test('health endpoint returns ok', async ({ request }) => {
  const res = await request.get('/api/health')
  expect(res.status()).toBe(200)
  expect(await res.json()).toMatchObject({ status: 'ok' })
})
