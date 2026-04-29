'use client';

import Link from 'next/link';
import { Product } from '@/lib/products';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden card-hover group">
      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />

      <div className="p-6">
        <div className="aspect-square bg-zinc-800 rounded-2xl mb-6 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discreet && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-xs text-zinc-300 px-2 py-1 rounded-full">
              🔒 隐私发货
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-orange-400 mb-1">{product.category}</p>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-zinc-400 text-sm">{product.nameEn}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-amber-400">★</span>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-zinc-500 text-sm">({product.reviews}件评价)</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-white">
            ¥{product.price.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 p-6 pt-0">
        <Link
          href={`/products/${product.id}`}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3.5 rounded-2xl text-center transition-all active:scale-[0.985]"
        >
          查看详情
        </Link>
      </div>
    </div>
  );
}
