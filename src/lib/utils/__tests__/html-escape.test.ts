import { describe, it, expect } from 'vitest'
import { escapeHtml } from '../html-escape'

describe('escapeHtml', () => {
  it('escapes ampersand', () => {
    expect(escapeHtml('foo & bar')).toBe('foo &amp; bar')
  })

  it('escapes less-than sign', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('escapes greater-than sign', () => {
    expect(escapeHtml('a > b')).toBe('a &gt; b')
  })

  it('escapes double quotes', () => {
    expect(escapeHtml('say "hello"')).toBe('say &quot;hello&quot;')
  })

  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#x27;s')
  })

  it('escapes all special characters in one string', () => {
    expect(escapeHtml('<a href="test">&\'</a>')).toBe(
      '&lt;a href=&quot;test&quot;&gt;&amp;&#x27;&lt;/a&gt;'
    )
  })

  it('leaves safe strings unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world')
    expect(escapeHtml('abc123')).toBe('abc123')
    expect(escapeHtml('Green Label Services')).toBe('Green Label Services')
  })

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('')
  })

  it('handles strings with only special characters', () => {
    expect(escapeHtml('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&#x27;')
  })
})
