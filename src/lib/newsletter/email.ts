type SendArgs = { to: string; subject: string; html: string }

export async function sendEmail({ to, subject, html }: SendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'hello@gptcplays.com'

  if (!apiKey) {
    console.log(`[email:dev] To: ${to}\nSubject: ${subject}\n${html}`)
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend ${res.status}: ${body}`)
  }
}

export function confirmEmail(confirmUrl: string): { subject: string; html: string } {
  return {
    subject: 'Confirm your subscription · GPTC',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;">
        <h1 style="font-size:28px;margin:0 0 16px;">One more step</h1>
        <p>Tap the button to confirm your subscription to Great Plains Theatre Commons news.</p>
        <p style="margin:24px 0;">
          <a href="${confirmUrl}" style="display:inline-block;padding:14px 22px;background:#ff4da6;color:#fff;text-decoration:none;border:3px solid #0a0a0a;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Confirm</a>
        </p>
        <p style="color:#555;font-size:14px;">If you didn't sign up, ignore this email.</p>
      </div>
    `,
  }
}
