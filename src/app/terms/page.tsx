export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold text-[#131722] mb-8">Terms and Conditions</h1>
      <div className="prose prose-lg text-[#5D6069] space-y-6">
        <p>
          Welcome to Wyckoff Pro. By accessing our website and using our indicators, you agree to comply with the following terms and conditions of use.
        </p>
        
        <h3 className="text-2xl font-bold text-[#131722] mt-8 mb-4">1. License Usage</h3>
        <p>
          Purchasing our indicators grants a personal, non-transferable, and non-exclusive license for use on the TradingView platform. Resale, redistribution, or reverse engineering of our scripts is prohibited.
        </p>

        <h3 className="text-2xl font-bold text-[#131722] mt-8 mb-4">2. Financial Disclaimer</h3>
        <p>
          Trading in financial markets carries a high level of risk and may not be suitable for all investors. Wyckoff Pro provides technical analysis tools for educational and informational purposes. We do not offer financial advice or investment recommendations.
        </p>
        <p>
          Past performance of any trading system or methodology is not necessarily indicative of future results. You are solely responsible for your investment decisions and the associated risk.
        </p>

        <h3 className="text-2xl font-bold text-[#131722] mt-8 mb-4">3. Refunds and Cancellations</h3>
        <p>
          We offer a trial period and satisfaction guarantee. Subscription cancellations must be made before the automatic renewal date through the user portal.
        </p>

        <h3 className="text-2xl font-bold text-[#131722] mt-8 mb-4">4. Modifications</h3>
        <p>
          We reserve the right to modify or discontinue, temporarily or permanently, the service with or without prior notice. We also reserve the right to update these terms at any time.
        </p>
      </div>
    </div>
  );
}

