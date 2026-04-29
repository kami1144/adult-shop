'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProduct } from '@/lib/products';

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProduct(params.id as string);

  if (!product) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">商品不存在</h1>
          <Link href="/products" className="text-orange-400 hover:text-orange-300">
            ← 返回商品列表
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-400 mb-8">
          <Link href="/products" className="hover:text-white">商品列表</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square bg-zinc-900 rounded-3xl overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discreet && (
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-sm text-zinc-300 px-3 py-1.5 rounded-full">
                🔒 隐私发货
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-orange-400 text-sm mb-2">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-zinc-400">{product.nameEn}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <span className="font-medium">{product.rating}</span>
              <span className="text-zinc-500">({product.reviews}件评价)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold">
              ¥{product.price.toLocaleString()}
            </div>

            {/* Description */}
            <p className="text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <span className="text-orange-400">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="pt-4">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl text-lg transition-all">
                加入购物车
              </button>
            </div>

            {/* Privacy Note */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <p className="text-sm text-zinc-400">
                🔒 所有订单均采用隐蔽包装，快递单仅显示"生活用品"，保护您的隐私安全。
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
