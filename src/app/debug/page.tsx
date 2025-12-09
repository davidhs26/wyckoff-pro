"use client";

export default function DebugPage() {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="mb-2">
          <strong>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:</strong>
        </p>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
          {stripeKey ? `"${stripeKey}"` : "undefined"}
        </pre>
        <p className="mt-4 text-sm text-gray-500">
          Length: {stripeKey ? stripeKey.length : 0}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Starts with pk_test: {stripeKey?.startsWith("pk_test") ? "✅ Yes" : "❌ No"}
        </p>
      </div>
    </div>
  );
}

