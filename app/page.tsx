'use client';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/supabase';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-cream-50 text-charcoal-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-rose-100 py-20 sm:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-rose-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gold-200 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-charcoal-700 px-5 py-2 rounded-full mb-6 shadow-sm">
            <span>🔒</span>
            <span className="text-sm font-medium">100% Private Shipping</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-wide text-charcoal-900 mb-6">
            Discover Your Style
          </h1>
          <p className="text-lg sm:text-xl text-charcoal-700 max-w-2xl mx-auto leading-relaxed mb-10">
            Discreet packaging. Japan direct. Your privacy, our promise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="morandi-btn px-8 py-4 rounded-full font-medium text-white">
              Shop Now
            </Link>
            <Link href="/about" className="px-8 py-4 rounded-full font-medium text-charcoal-700 border border-charcoal-700 hover:bg-charcoal-900 hover:text-white transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">🔒</div>
              <h3 className="font-semibold mb-1">100% Discreet</h3>
              <p className="text-sm text-charcoal-700">Plain packaging, no product info</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-gold-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">✈️</div>
              <h3 className="font-semibold mb-1">Japan Direct</h3>
              <p className="text-sm text-charcoal-700">7-10 business days delivery</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-cream-200 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">💳</div>
              <h3 className="font-semibold mb-1">Secure Payment</h3>
              <p className="text-sm text-charcoal-700">PayPal & Credit Card</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <p className="text-gold-500 text-sm tracking-wider uppercase mb-2">Collection</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold">Featured</h2>
            </div>
            <Link href="/products" className="text-sm text-charcoal-700 hover:text-gold-500 font-medium flex items-center gap-1 transition-colors">
              View All
              <span>→</span>
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden border border-cream-200 animate-pulse">
                  <div className="aspect-square bg-gradient-to-br from-cream-100 to-cream-200" />
                  <div className="p-6">
                    <div className="h-3 w-16 bg-cream-200 rounded mb-2" />
                    <div className="h-5 w-32 bg-cream-200 rounded mb-1" />
                    <div className="h-4 w-24 bg-cream-200 rounded mb-3" />
                    <div className="h-4 w-20 bg-cream-200 rounded mb-4" />
                    <div className="flex justify-between">
                      <div className="h-6 w-20 bg-cream-200 rounded" />
                      <div className="h-10 w-20 bg-cream-200 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal-700 text-lg mb-4">No products available yet.</p>
              <Link href="/products" className="morandi-btn px-6 py-3 rounded-full font-medium">
                Browse All
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white mb-4">
            First Time Customer?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
            7-day hassle-free returns. Full customer support. Your satisfaction is our priority.
          </p>
          <Link href="/products" className="morandi-btn inline-block px-10 py-4 rounded-full font-medium">
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-cream-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">隠</span>
              </div>
              <span className="font-serif text-lg">[Brand]</span>
            </div>
            <div className="flex gap-6 text-sm text-charcoal-700">
              <Link href="/about" className="hover:text-gold-500 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-gold-500 transition-colors">Contact</Link>
              <Link href="/products" className="hover:text-gold-500 transition-colors">Products</Link>
            </div>
            <p className="text-xs text-charcoal-700">© 2026 [Brand] · Private · Japan Direct</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
