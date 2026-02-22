import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
if (!apiKey) {
  console.warn('RESEND_API_KEY not set — email sending will fail')
}
const resend = apiKey ? new Resend(apiKey) : null

const FROM_EMAIL = 'Green Label Services <info@greenlabelservicesug.com>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ainer2014@gmail.com'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  if (!resend) {
    console.warn('Email not sent — Resend client is not configured (RESEND_API_KEY missing)')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo && { replyTo }),
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (error) {
    console.error('Email send exception:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendAdminNotification(subject: string, html: string, replyTo?: string) {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Green Label] ${subject}`,
    html,
    replyTo,
  })
}

export async function sendUserConfirmation(to: string, subject: string, html: string) {
  return sendEmail({
    to,
    subject,
    html,
  })
}
