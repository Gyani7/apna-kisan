export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-14">
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        <div className="skeleton h-12 rounded-xl" />
        <div className="flex gap-2">
          <div className="skeleton h-10 w-16 rounded-xl" />
          <div className="skeleton h-10 w-20 rounded-xl" />
          <div className="skeleton h-10 w-16 rounded-xl" />
        </div>
        <div className="skeleton h-52 rounded-2xl" />
        <div className="skeleton h-52 rounded-2xl" />
      </div>
    </div>
  );
}
