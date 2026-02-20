interface ContactAdminProps {
  fullName: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  location?: string
  preferredContact: string
  marketingConsent: boolean
  ipAddress?: string
  userAgent?: string
  submittedAt: string
}

export function contactAdminHtml(data: ContactAdminProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#F7941D;padding:20px 30px;">
        <h1 style="color:#ffffff;margin:0;font-size:20px;">New Contact Form Submission</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px;">
        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;width:150px;"><strong>Name</strong></td>
            <td style="color:#333;font-size:14px;">${data.fullName}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Email</strong></td>
            <td style="color:#333;font-size:14px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Phone</strong></td><td style="color:#333;font-size:14px;">${data.phone}</td></tr>` : ''}
          ${data.company ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Company</strong></td><td style="color:#333;font-size:14px;">${data.company}</td></tr>` : ''}
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Subject</strong></td>
            <td style="color:#333;font-size:14px;">${data.subject}</td>
          </tr>
          ${data.location ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Location</strong></td><td style="color:#333;font-size:14px;">${data.location}</td></tr>` : ''}
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Preferred Contact</strong></td>
            <td style="color:#333;font-size:14px;">${data.preferredContact}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Marketing Consent</strong></td>
            <td style="color:#333;font-size:14px;">${data.marketingConsent ? 'Yes' : 'No'}</td>
          </tr>
        </table>
        <div style="background:#f9fafb;padding:15px 20px;margin:20px 0;border-radius:8px;">
          <p style="margin:0 0 5px;color:#666;font-size:14px;"><strong>Message:</strong></p>
          <p style="margin:0;color:#333;font-size:14px;line-height:1.6;">${data.message}</p>
        </div>
        <div style="background:#f3f4f6;padding:10px 15px;border-radius:4px;font-size:12px;color:#6b7280;">
          <p style="margin:2px 0;">IP: ${data.ipAddress || 'N/A'} | UA: ${data.userAgent?.substring(0, 80) || 'N/A'}</p>
          <p style="margin:2px 0;">Submitted: ${data.submittedAt}</p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`
}
