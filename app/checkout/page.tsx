'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-serif font-semibold mb-10">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          {['Shipping', 'Payment', 'Confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1 ? 'bg-gold-400 text-white' :
                step === i + 1 ? 'bg-charcoal-900 text-white' :
                'bg-cream-200 text-charcoal-700'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${step >= i + 1 ? 'text-charcoal-900' : 'text-charcoal-700'}`}>{s}</span>
              {i < 2 && <span className="text-cream-300 mx-2">→</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-5">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-charcoal-700 mb-1 block">Name</label>
                    <input type="text" placeholder="Yamada Taro" className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm text-charcoal-700 mb-1 block">Phone</label>
                    <input type="tel" placeholder="090-1234-5678" className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-charcoal-700 mb-1 block">Postal Code</label>
                  <input type="text" placeholder="123-4567" className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors" />
                </div>
                <div>
                  <label className="text-sm text-charcoal-700 mb-1 block">Address</label>
                  <input type="text" placeholder="Tokyo, Shibuya-ku..." className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors" />
                </div>
                <button onClick={() => setStep(2)} className="w-full morandi-btn py-3.5 rounded-xl font-medium text-white mt-4">
                  Next Step
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-cream-200 space-y-4">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                {['PayPal', 'Credit Card', 'Convenience Store'].map((method) => (
                  <label key={method} className="flex items-center gap-3 p-4 bg-cream-50 rounded-xl cursor-pointer hover:bg-cream-100 transition-colors">
                    <input type="radio" name="payment" className="w-5 h-5 accent-gold-400" />
                    <span className="text-charcoal-700">{method}</span>
                  </label>
                ))}
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-cream-100 text-charcoal-700 font-medium py-3 rounded-xl hover:bg-cream-200 transition-colors">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 morandi-btn py-3 rounded-xl font-medium text-white">
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-cream-200">
                <h2 className="text-lg font-semibold mb-4">Order Review</h2>
                <div className="space-y-3 text-charcoal-700">
                  <div className="flex justify-between">
                    <span>Product 1 x1</span>
                    <span>¥3,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Product 2 x1</span>
                    <span>¥5,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>¥1,000</span>
                  </div>
                  <div className="border-t border-cream-200 pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-gold-500">¥10,000</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 bg-cream-100 text-charcoal-700 font-medium py-3 rounded-xl hover:bg-cream-200 transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 morandi-btn py-3 rounded-xl font-medium text-white">
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 border border-cream-200 h-fit">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-charcoal-700">
                <span>Subtotal</span>
                <span>¥9,000</span>
              </div>
              <div className="flex justify-between text-charcoal-700">
                <span>Shipping</span>
                <span>¥1,000</span>
              </div>
              <div className="border-t border-cream-200 pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-gold-500">¥10,000</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-cream-50 rounded-xl">
              <p className="text-xs text-charcoal-700 flex items-center gap-2">
                <span>🔒</span> Your personal information is protected. Plain packaging guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
