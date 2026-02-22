import { escapeHtml } from '@/lib/utils/html-escape'

interface ApplicationConfirmationProps {
  firstName: string
  jobTitle: string
}

export function applicationConfirmationHtml({ firstName, jobTitle }: ApplicationConfirmationProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#2c632c;padding:30px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;">Application Received</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:40px 30px;">
        <h2 style="color:#2c632c;margin:0 0 20px;">Thank You for Applying!</h2>
        <p style="color:#333;line-height:1.6;">Dear ${escapeHtml(firstName)},</p>
        <p style="color:#333;line-height:1.6;">We have received your application for the position of <strong>${escapeHtml(jobTitle)}</strong> at Green Label Services.</p>
        <div style="background:#f0fdf4;border-left:4px solid #2c632c;padding:15px 20px;margin:20px 0;">
          <p style="margin:0;color:#333;font-size:14px;"><strong>What happens next?</strong></p>
          <ul style="color:#333;line-height:2;margin:10px 0 0;">
            <li>Our HR team will review your application</li>
            <li>If shortlisted, we will contact you for an interview</li>
            <li>The process typically takes 1-2 weeks</li>
          </ul>
        </div>
        <p style="color:#333;line-height:1.6;">If you have any questions, please contact our HR department at <a href="mailto:hr@greenlabel-services.com" style="color:#2c632c;">hr@greenlabel-services.com</a>.</p>
        <p style="color:#333;line-height:1.6;">Best regards,<br><strong>Green Label Services HR Team</strong></p>
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
