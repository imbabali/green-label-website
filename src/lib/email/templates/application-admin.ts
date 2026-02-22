import { escapeHtml } from '@/lib/utils/html-escape'

interface ApplicationAdminProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  jobSlug: string
  currentCompany?: string
  currentPosition?: string
  linkedinProfile?: string
  portfolioUrl?: string
  resumeUrl: string
  coverLetter?: string
  siteUrl: string
}

export function applicationAdminHtml(data: ApplicationAdminProps): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:#F7941D;padding:20px 30px;">
        <h1 style="color:#ffffff;margin:0;font-size:20px;">New Job Application: ${escapeHtml(data.jobTitle)}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:30px;">
        <h3 style="color:#2c632c;margin:0 0 15px;">Applicant Information</h3>
        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;">
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;width:150px;"><strong>Name</strong></td>
            <td style="color:#333;font-size:14px;">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Email</strong></td>
            <td style="color:#333;font-size:14px;"><a href="mailto:${data.email}">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="color:#666;font-size:14px;"><strong>Phone</strong></td>
            <td style="color:#333;font-size:14px;">${escapeHtml(data.phone)}</td>
          </tr>
          ${data.currentCompany ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Current Company</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.currentCompany)}</td></tr>` : ''}
          ${data.currentPosition ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Current Position</strong></td><td style="color:#333;font-size:14px;">${escapeHtml(data.currentPosition)}</td></tr>` : ''}
          ${data.linkedinProfile ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>LinkedIn</strong></td><td style="color:#333;font-size:14px;"><a href="${data.linkedinProfile}">${escapeHtml(data.linkedinProfile)}</a></td></tr>` : ''}
          ${data.portfolioUrl ? `<tr style="border-bottom:1px solid #e5e7eb;"><td style="color:#666;font-size:14px;"><strong>Portfolio</strong></td><td style="color:#333;font-size:14px;"><a href="${data.portfolioUrl}">${escapeHtml(data.portfolioUrl)}</a></td></tr>` : ''}
        </table>
        <div style="margin:20px 0;">
          <a href="${data.resumeUrl}" style="display:inline-block;background:#2c632c;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;">Download Resume</a>
          <a href="${data.siteUrl}/careers/jobs/${data.jobSlug}" style="display:inline-block;background:#F7941D;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-left:10px;">View Job Listing</a>
        </div>
        ${data.coverLetter ? `
        <div style="background:#f9fafb;padding:15px 20px;margin:20px 0;border-radius:8px;">
          <p style="margin:0 0 5px;color:#666;font-size:14px;"><strong>Cover Letter:</strong></p>
          <p style="margin:0;color:#333;font-size:14px;line-height:1.6;">${escapeHtml(data.coverLetter)}</p>
        </div>` : ''}
      </td>
    </tr>
    <tr>
      <td style="background:#1f2937;padding:15px 30px;text-align:center;">
        <p style="color:#9ca3af;font-size:12px;margin:0;">Green Label Services Ltd | HR Department</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
