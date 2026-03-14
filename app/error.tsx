'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h1>Error 404: Reality Glitch</h1>
      <p>An unexpected error occurred. Please try again.</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )
}