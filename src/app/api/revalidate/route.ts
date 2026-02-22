import crypto from 'crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

function constantTimeEqual(a: string, b: string): boolean {
  try {
    return crypto.timingSafeEqual(
      Buffer.from(a, 'utf-8'),
      Buffer.from(b, 'utf-8')
    )
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!secret || !constantTimeEqual(secret, process.env.SANITY_REVALIDATE_SECRET || '')) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type } = body

    const tagMap: Record<string, string[]> = {
      blogPost: ['posts', 'blog'],
      blogCategory: ['categories', 'blog'],
      blogTag: ['tags', 'blog'],
      service: ['services'],
      serviceCategory: ['services', 'serviceCategories'],
      job: ['jobs'],
      jobCategory: ['jobs', 'jobCategories'],
      page: ['pages'],
      teamMember: ['team'],
      companyMilestone: ['milestones'],
      nemaLicense: ['licenses'],
      galleryImage: ['gallery'],
      faqCategory: ['faqs'],
      faqItem: ['faqs'],
      award: ['awards'],
      project: ['projects'],
    }

    const tags = tagMap[_type] || ['all']
    tags.forEach((tag) => revalidateTag(tag, { expire: 0 }))

    return NextResponse.json({
      revalidated: true,
      tags,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
