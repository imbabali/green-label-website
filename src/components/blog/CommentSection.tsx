'use client'

import { useState } from 'react'
import CommentForm from '@/components/forms/CommentForm'
import { timeAgo } from '@/lib/utils/format'

interface Comment {
  id: string
  name: string
  content: string
  created_at: string
  parent_id: string | null
  replies?: Comment[]
}

interface CommentSectionProps {
  postSlug: string
  comments: Comment[]
}

function buildCommentTree(comments: Comment[]): Comment[] {
  const map = new Map<string, Comment>()
  const roots: Comment[] = []

  comments.forEach((c) => map.set(c.id, { ...c, replies: [] }))
  comments.forEach((c) => {
    const comment = map.get(c.id)!
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies!.push(comment)
    } else {
      roots.push(comment)
    }
  })

  return roots
}

function CommentThread({
  comment,
  onReply,
  depth = 0,
}: {
  comment: Comment
  onReply: (id: string) => void
  depth?: number
}) {
  return (
    <div className={depth > 0 ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}>
      <div className="py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
            {comment.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{comment.name}</span>
              <span className="text-sm text-gray-500">{timeAgo(comment.created_at)}</span>
            </div>
            <p className="mt-1 text-gray-700">{comment.content}</p>
            {depth < 3 && (
              <button
                onClick={() => onReply(comment.id)}
                className="mt-2 text-sm font-medium text-brand-green hover:text-brand-green-dark"
              >
                <i className="fa-solid fa-reply mr-1" /> Reply
              </button>
            )}
          </div>
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <CommentThread key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function CommentSection({ postSlug, comments }: CommentSectionProps) {
  const [replyTo, setReplyTo] = useState<string | undefined>()
  const tree = buildCommentTree(comments)

  return (
    <section id="comments" className="mt-12">
      <h3 className="font-heading text-2xl font-bold text-gray-900">
        Comments ({comments.length})
      </h3>

      {tree.length > 0 ? (
        <div className="mt-6 divide-y divide-gray-100">
          {tree.map((comment) => (
            <CommentThread key={comment.id} comment={comment} onReply={setReplyTo} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No comments yet. Be the first to share your thoughts!</p>
      )}

      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h4 className="mb-4 font-heading text-lg font-semibold">Leave a Comment</h4>
        <CommentForm
          postSlug={postSlug}
          parentId={replyTo}
          onCancel={replyTo ? () => setReplyTo(undefined) : undefined}
        />
      </div>
    </section>
  )
}
