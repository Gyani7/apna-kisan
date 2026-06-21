export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-gray-600">
          There was an error authenticating your account. Please try signing in again.
        </p>
        <a href="/login" className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Back to Login
        </a>
      </div>
    </div>
  );
}
