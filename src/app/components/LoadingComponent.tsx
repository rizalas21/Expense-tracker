export default function LoadingComponent() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center flex-col gap-4 z-9999 absolute">
      {/* Spinner */}
      <div className="h-16 w-16 border-4 border-blue-600 border-e-transparent rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="text-gray-700 text-base font-medium animate-pulse">
        Logging in... Please wait
      </p>

      {/* Optional Info */}
      <p className="text-gray-500 text-sm italic">
        Expense Tracker is getting ready
      </p>
    </div>
  );
}
