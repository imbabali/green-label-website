interface ContactConfirmationProps {
  fullName: string
  subject: string
  message: string
}

export function contactConfirmationHtml({ fullName, subject, message }: ContactConfirmationProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#2c632c;padding:30px;text-align:center;">
        <h1 style="color:#ffffff;margin:0;font-size:24px;">Green Label Services</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:40px 30px;">
        <h2 style="color:#2c632c;margin:0 0 20px;">Thank You for Contacting Us</h2>
        <p style="color:#333;line-height:1.6;">Dear ${fullName},</p>
        <p style="color:#333;line-height:1.6;">Thank you for reaching out to Green Label Services. We have received your inquiry and our team will get back to you within <strong>24 hours</strong>.</p>
        <div style="background:#f9fafb;border-left:4px solid #2c632c;padding:15px 20px;margin:20px 0;">
          <p style="margin:0 0 5px;color:#666;font-size:14px;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin:0;color:#666;font-size:14px;"><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
        </div>
        <p style="color:#333;line-height:1.6;">If your matter is urgent, please call us directly at <strong>+256 772 423 092</strong>.</p>
        <p style="color:#333;line-height:1.6;">Best regards,<br><strong>Green Label Services Team</strong></p>
      </td>
    </tr>
    <tr>
      <td style="background:#1f2937;padding:20px 30px;text-align:center;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">Green Label Services Ltd</p>
        <p style="color:#9ca3af;font-size:12px;margin:5px 0;">Plot 89, Block 29 Church Road, Off Mawanda Rd, Kampala, Uganda</p>
        <p style="color:#9ca3af;font-size:12px;margin:5px 0;">+256 772 423 092 | info@greenlabelservicesug.com</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
