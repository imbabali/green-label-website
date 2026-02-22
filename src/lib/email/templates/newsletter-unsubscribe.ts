import { escapeHtml } from '@/lib/utils/html-escape'

interface NewsletterUnsubscribeProps {
  email: string
  siteUrl: string
}

export function newsletterUnsubscribeHtml({ email, siteUrl }: NewsletterUnsubscribeProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#2c632c;padding:30px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;">Unsubscribed Successfully</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:40px 30px;text-align:center;">
        <p style="color:#333;line-height:1.6;font-size:16px;">You have been successfully unsubscribed from the Green Label Services newsletter.</p>
        <p style="color:#666;line-height:1.6;">Email: <strong>${escapeHtml(email)}</strong></p>
        <p style="color:#333;line-height:1.6;margin-top:20px;">We're sorry to see you go. If you change your mind, you can always resubscribe on our website.</p>
        <a href="${siteUrl}" style="display:inline-block;background:#2c632c;color:#ffffff;padding:12px 30px;border-radius:6px;text-decoration:none;margin-top:15px;">Visit Our Website</a>
      </td>
    </tr>
    <tr>
      <td style="background:#1f2937;padding:20px 30px;text-align:center;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">Green Label Services Ltd | Kampala, Uganda</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
