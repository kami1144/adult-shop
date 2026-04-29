'use client';
import Link from 'next/link';
import { products } from '@/lib/products';

export default function CartPage() {
  const cartItems = products.slice(0, 2);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-serif font-semibold mb-10">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-10">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 flex gap-5 border border-cream-200">
                  <div className="w-28 h-28 bg-gradient-to-br from-cream-100 to-cream-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-charcoal-900">{item.name}</h3>
                    <p className="text-sm text-charcoal-700">{item.nameEn}</p>
                    <p className="text-gold-500 font-medium mt-2">¥{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button className="text-charcoal-700 hover:text-red-500 text-sm">Remove</button>
                    <span className="text-charcoal-700 text-sm">x1</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 border border-cream-200">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-charcoal-700">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-charcoal-700">
                  <span>Shipping</span>
                  <span>¥1,000 (Japan Direct)</span>
                </div>
                <div className="border-t border-cream-200 pt-4">
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <span>Total</span>
                    <span className="text-gold-500">¥{(total + 1000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Link href="/checkout" className="block w-full morandi-btn text-center py-4 rounded-2xl font-semibold text-white">
                Checkout
              </Link>
              <p className="text-center text-xs text-charcoal-700 mt-4 flex items-center justify-center gap-1">
                <span>🔒</span> Secure & Private Checkout
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-charcoal-700 mb-6">Your cart is empty</p>
            <Link href="/products" className="text-gold-500 hover:text-gold-600 font-medium">
              Start Shopping →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
