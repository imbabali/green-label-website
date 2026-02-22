/**
 * Escapes HTML special characters to prevent XSS in email templates.
 */
export function escapeHtml(str: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  }
  return str.replace(/[&<>"']/g, (char) => escapeMap[char] || char)
}
