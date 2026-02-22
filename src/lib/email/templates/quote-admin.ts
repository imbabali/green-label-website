import { escapeHtml } from '@/lib/utils/html-escape'

interface QuoteAdminProps {
  name: string
  email: string
  phone?: string
  company?: string
  serviceType: string
  location: string
  frequency?: string
  estimatedVolume?: string
  message: string
  timeline?: string
  budgetRange?: string
  marketingConsent: boolean
}

export function quoteAdminHtml(data: QuoteAdminProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#F7941D;padding:20px 30px;">
        <h1 style="color:#ffffff;margin:0;font-size:20px;">New Quote Request</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px;">
        <h3 style="color:#2c632c;margin:0 0 15px;">Contact Information</h3>
        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;width:150px;"><strong>Name</strong></td>
            <td style="color:#333;font-size:14px;">${escapeHtml(data.name)}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Email</strong></td>
            <td style="color:#333;font-size:14px;"><a href="mailto:${data.email}">${escapeHtml(data.email)}</a></td>
          </tr>
          ${data.phone ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Phone</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.phone)}</td></tr>` : ''}
          ${data.company ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Company</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.company)}</td></tr>` : ''}
        </table>
        <h3 style="color:#2c632c;margin:0 0 15px;">Service Details</h3>
        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;width:150px;"><strong>Service Type</strong></td>
            <td style="color:#333;font-size:14px;">${escapeHtml(data.serviceType)}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Location</strong></td>
            <td style="color:#333;font-size:14px;">${escapeHtml(data.location)}</td>
          </tr>
          ${data.frequency ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Frequency</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.frequency)}</td></tr>` : ''}
          ${data.estimatedVolume ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Est. Volume</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.estimatedVolume)}</td></tr>` : ''}
          ${data.timeline ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Timeline</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.timeline)}</td></tr>` : ''}
          ${data.budgetRange ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Budget</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.budgetRange)}</td></tr>` : ''}
        </table>
        <div style="background:#f9fafb;padding:15px 20px;margin:20px 0;border-radius:8px;">
          <p style="margin:0 0 5px;color:#666;font-size:14px;"><strong>Project Details:</strong></p>
          <p style="margin:0;color:#333;font-size:14px;line-height:1.6;">${escapeHtml(data.message)}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:#1f2937;padding:15px 30px;text-align:center;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">Green Label Services Ltd | Kampala, Uganda</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
