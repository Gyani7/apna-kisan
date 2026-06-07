'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">&#128533;</div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Kuch gadbad ho gayi!</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{error.message || 'An unexpected error occurred'}</p>
        <button onClick={reset} className="btn-primary">Dobara try karein</button>
      </div>
    </div>
  );
}
