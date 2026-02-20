interface NewsletterWelcomeProps {
  name?: string
  email: string
  frequency: string
  unsubscribeToken: string
  siteUrl: string
}

export function newsletterWelcomeHtml({ name, email, frequency, unsubscribeToken, siteUrl }: NewsletterWelcomeProps): string {
  const frequencyLabel = { D: 'Daily', W: 'Weekly', M: 'Monthly' }[frequency] || 'Weekly'

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#2c632c;padding:30px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;">Welcome to Our Newsletter!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:40px 30px;">
        <p style="color:#333;line-height:1.6;font-size:16px;">Dear ${name || 'Subscriber'},</p>
        <p style="color:#333;line-height:1.6;">Thank you for subscribing to the Green Label Services newsletter! You'll receive the latest updates on waste management practices, sustainability tips, and industry news.</p>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:20px;border-radius:8px;margin:20px 0;">
          <h3 style="color:#2c632c;margin:0 0 10px;">Your Subscription Details</h3>
          <p style="margin:5px 0;color:#333;font-size:14px;"><strong>Email:</strong> ${email}</p>
          <p style="margin:5px 0;color:#333;font-size:14px;"><strong>Frequency:</strong> ${frequencyLabel}</p>
          <p style="margin:5px 0;color:#333;font-size:14px;"><strong>Subscribed:</strong> ${new Date().toLocaleDateString('en-UG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <h3 style="color:#2c632c;">What to Expect</h3>
        <ul style="color:#333;line-height:2;">
          <li>Industry insights and best practices</li>
          <li>Sustainability tips and environmental news</li>
          <li>Regulatory updates affecting waste management</li>
          <li>Company news and service announcements</li>
        </ul>
        <p style="color:#333;line-height:1.6;">Best regards,<br><strong>Green Label Services Team</strong></p>
      </td>
    </tr>
    <tr>
      <td style="background:#1f2937;padding:20px 30px;text-align:center;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">Green Label Services Ltd | Kampala, Uganda</p>
        <p style="color:#9ca3af;font-size:12px;margin:10px 0 0;">
          <a href="${siteUrl}/api/newsletter/unsubscribe/${unsubscribeToken}" style="color:#9ca3af;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
