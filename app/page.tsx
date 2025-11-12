export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Home</h1>
        <p className="text-lg text-gray-700 mb-8">
          This is a proof of concept website for Lighthouse testing using Puppeteer.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">🎯 Performance</h2>
            <p className="text-gray-600">
              Optimized for fast load times and smooth interactions.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">🔒 Secure</h2>
            <p className="text-gray-600">
              Simple authentication to protect your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
