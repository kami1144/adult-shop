'use client';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold mb-2 text-center">Contact Us</h1>
        <p className="text-charcoal-700 text-center mb-10">For business inquiries or questions</p>

        <div className="bg-white rounded-2xl p-8 border border-cream-200 max-w-xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="text-sm text-charcoal-700 mb-2 block">Your Name</label>
              <input type="text" placeholder="Enter your name" className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors" />
            </div>

            <div>
              <label className="text-sm text-charcoal-700 mb-2 block">Email</label>
              <input type="email" placeholder="example@email.com" className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors" />
            </div>

            <div>
              <label className="text-sm text-charcoal-700 mb-2 block">Inquiry Type</label>
              <select className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors">
                <option>Product Inquiry</option>
                <option>Order Status</option>
                <option>Business Cooperation</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-charcoal-700 mb-2 block">Message</label>
              <textarea rows={5} placeholder="Please describe your needs in detail..." className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors resize-none" />
            </div>

            <button type="submit" className="w-full morandi-btn py-4 rounded-2xl font-semibold text-white">
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-cream-200">
            <p className="text-sm text-charcoal-700 text-center">
              We typically respond within 1-2 business days
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
