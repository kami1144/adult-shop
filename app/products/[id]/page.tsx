'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase, Product } from '@/lib/supabase';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id as string)
        .single();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-charcoal-700">Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-semibold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-gold-500 hover:text-gold-600">
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-charcoal-700 mb-8">
          <Link href="/products" className="hover:text-gold-500 transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-cream-100 to-cream-200 rounded-3xl overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discreet && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-sm text-charcoal-700 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <span>🔒</span>
                <span>Private Shipping</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-gold-500 text-sm tracking-wider uppercase mb-2">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal-900 mb-2">{product.name}</h1>
              <p className="text-charcoal-700">{product.name_en}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex text-gold-400">
                {'★'.repeat(Math.floor(product.rating))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-charcoal-700">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-serif font-semibold text-charcoal-900">
              ¥{product.price.toLocaleString()}
            </div>

            {/* Description */}
            <p className="text-charcoal-700 leading-relaxed border-t border-b border-cream-200 py-6">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-charcoal-700">
                  <span className="text-gold-400">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="pt-4">
              <button className="w-full morandi-btn py-4 rounded-2xl font-semibold text-white text-lg">
                Add to Cart
              </button>
            </div>

            {/* Privacy Note */}
            <div className="bg-white border border-cream-200 rounded-2xl p-5">
              <p className="text-sm text-charcoal-700 flex items-center gap-2">
                <span>🔒</span>
                All orders shipped in plain packaging. Delivery only shows &quot;Daily Necessities&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
