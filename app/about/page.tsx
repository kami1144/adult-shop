'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold mb-10 text-center">About Us</h1>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl p-8 border border-cream-200">
            <h2 className="text-xl font-semibold mb-4 text-gold-500">Our Promise</h2>
            <p className="text-charcoal-700 leading-relaxed">
              We are dedicated to providing high-quality, elegantly designed products for the Japanese market. We understand the importance of privacy, which is why all orders are shipped in 100% discreet packaging, ensuring your shopping experience remains completely confidential.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-cream-200">
            <h2 className="text-xl font-semibold mb-4 text-gold-500">Privacy Protection</h2>
            <ul className="space-y-3 text-charcoal-700">
              <li className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">✓</span>
                <span>Delivery label only shows "Daily Necessities", no sensitive information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">✓</span>
                <span>Sealed packaging, invisible to others</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">✓</span>
                <span>Encrypted payment processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">✓</span>
                <span>We never share your personal information with third parties</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-cream-200">
            <h2 className="text-xl font-semibold mb-4 text-gold-500">Shipping</h2>
            <ul className="space-y-3 text-charcoal-700">
              <li className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">✈️</span>
                <span>Japan warehouse direct shipping, 7-10 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">📦</span>
                <span>Fully discreet packaging</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold-400 mt-1">💰</span>
                <span>7-day hassle-free returns (unused items only)</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 border border-cream-200">
            <h2 className="text-xl font-semibold mb-4 text-gold-500">Contact Us</h2>
            <p className="text-charcoal-700 mb-4">
              Have questions? Reach out anytime:
            </p>
            <div className="space-y-2 text-charcoal-700">
              <p>📧 support@[brand].com</p>
              <p>⏰ Business Hours: Weekdays 10:00-18:00 (JST)</p>
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link href="/products" className="text-gold-500 hover:text-gold-600 font-medium">
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}
