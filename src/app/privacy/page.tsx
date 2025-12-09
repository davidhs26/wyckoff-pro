export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-[#131722] mb-8">Privacy Policy</h1>
      <div className="prose prose-lg text-[#5D6069] space-y-6">
        <p>
          At Wyckoff Pro, we take your privacy very seriously. This policy describes how we collect, use, and protect your personal information.
        </p>
        
        <h3 className="text-2xl font-bold text-[#131722] mt-8 mb-4">1. Information We Collect</h3>
        <p>
          We collect information necessary to process your subscription and provide access to our services, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name and email address.</li>
          <li>TradingView username (for indicator activation).</li>
          <li>Payment information (processed securely via Stripe, we do not store credit card data).</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#131722] mt-8 mb-4">2. Use of Information</h3>
        <p>
          We use your information to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Process transactions and manage your subscription.</li>
          <li>Provide customer support.</li>
          <li>Send you important product updates (you can unsubscribe at any time).</li>
        </ul>

        <h3 className="text-2xl font-bold text-[#131722] mt-8 mb-4">3. Data Protection</h3>
        <p>
          We implement industry-standard security measures to protect your personal data against unauthorized access, alteration, or disclosure.
        </p>
      </div>
    </div>
  );
}

