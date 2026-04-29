'use client';

import Link from 'next/link';
import { Product } from '@/lib/supabase';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden card-hover border border-cream-200 group">
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-cream-100 to-cream-200 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discreet && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs text-charcoal-700 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <span>🔒</span>
            <span>Private</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="text-xs text-gold-500 mb-1 tracking-wider uppercase">{product.category}</p>
        <h3 className="text-lg font-semibold text-charcoal-900 mb-1">{product.name}</h3>
        <p className="text-sm text-charcoal-700 mb-3">{product.name_en}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-gold-400 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
          </div>
          <span className="text-xs text-charcoal-700">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-charcoal-900">
            ¥{product.price.toLocaleString()}
          </div>
          <Link
            href={`/products/${product.id}`}
            className="morandi-btn px-5 py-2.5 rounded-full text-sm font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
