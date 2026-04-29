'use client';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [categories, setCategories] = useState<string[]>(['全部']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          const cats = ['全部', ...Array.from(new Set(data.map((p: Product) => p.category)))];
          setCategories(cats);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = selectedCategory === '全部'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-cream-50 text-charcoal-900">
      <div className="bg-gradient-to-r from-cream-100 to-rose-100 py-12 sm:py-16 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-gold-500 text-sm tracking-wider uppercase mb-2">Collection</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold mb-2">All Products</h1>
          <p className="text-charcoal-700">{filteredProducts.length} items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-charcoal-900 text-white'
                  : 'bg-white text-charcoal-700 border border-cream-200 hover:border-gold-400 hover:text-gold-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-charcoal-700">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-charcoal-700">
                No products in this category yet.
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
