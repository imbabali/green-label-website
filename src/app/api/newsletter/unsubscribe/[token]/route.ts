import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email/resend'
import { newsletterUnsubscribeHtml } from '@/lib/email/templates/newsletter-unsubscribe'
import { SITE_URL } from '@/lib/data/constants'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: subscriber, error } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, is_active')
    .eq('unsubscribe_token', token)
    .single()

  if (error || !subscriber) {
    return NextResponse.redirect(new URL('/?error=invalid-token', SITE_URL))
  }

  if (!subscriber.is_active) {
    return NextResponse.redirect(new URL('/?message=already-unsubscribed', SITE_URL))
  }

  await supabase
    .from('newsletter_subscribers')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', subscriber.id)

  await sendEmail({
    to: subscriber.email,
    subject: 'Unsubscribed from Green Label Services Newsletter',
    html: newsletterUnsubscribeHtml({ email: subscriber.email, siteUrl: SITE_URL }),
  })

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Unsubscribed</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:50px auto;text-align:center;padding:20px;">
  <h1 style="color:#2c632c;">Successfully Unsubscribed</h1>
  <p>You have been removed from our newsletter mailing list.</p>
  <p>If this was a mistake, you can always resubscribe on our website.</p>
  <a href="${SITE_URL}" style="display:inline-block;background:#2c632c;color:white;padding:12px 30px;border-radius:6px;text-decoration:none;margin-top:15px;">Visit Website</a>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
