export default function ContactPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-[#131722] mb-8">Help Center & Contact</h1>
      <div className="prose prose-lg text-[#5D6069] space-y-6">
        <p>
          Do you have questions about Wyckoff Pro or need technical assistance? We are here to help.
        </p>
        
        <div className="bg-[#F8F9FD] p-8 rounded-2xl border border-[#E0E3EB] mt-8">
          <h3 className="text-2xl font-bold text-[#131722] mb-4">Contact Us</h3>
          <p className="mb-4">
            You can send us an email directly and we will respond within 24 hours.
          </p>
          <a 
            href="mailto:support@wyckoffpro.com" 
            className="inline-block bg-[#2962FF] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#1E53E5] transition-colors"
          >
            support@wyckoffpro.com
          </a>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#131722] mb-4">Frequently Asked Questions</h3>
          <p>
            Before contacting us, we recommend checking our <a href="/#faq" className="text-[#2962FF] hover:underline">FAQ section</a> on the homepage, where we answer the most common questions about installation, billing, and using the indicator.
          </p>
        </div>
      </div>
    </div>
  );
}

