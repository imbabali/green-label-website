/**
 * Wraps a promise with a timeout. If the promise doesn't resolve within
 * the specified milliseconds, it rejects with a timeout error.
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  operation = 'Operation'
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`${operation} timed out after ${ms}ms`)),
      ms
    )
  })

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId)
  })
}
