'use client';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
            🔒 隐私购物 · 日本直邮
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            您的隐私，我们的
            <span className="text-orange-400">承诺</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            100%隐蔽包装，快递单仅显示"生活用品"。在家安心购买，无需顾虑。
          </p>
        </div>
      </section>

      {/* 隐私承诺 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">100%隐私包装</h3>
            <p className="text-zinc-400 text-sm">外包装无任何敏感信息，快递单仅显示"生活用品"</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-lg font-semibold mb-2">日本直邮</h3>
            <p className="text-zinc-400 text-sm">从日本仓库直接发货，7-10个工作日到货</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-semibold mb-2">安全支付</h3>
            <p className="text-zinc-400 text-sm">支持PayPal、信用卡等多种付款方式</p>
          </div>
        </div>
      </section>

      {/* 产品列表 */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">精选商品</h2>
            <p className="text-zinc-400 mt-2">品质保证，隐私发货</p>
          </div>
          <Link
            href="/products"
            className="text-orange-400 hover:text-orange-300 font-medium"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            第一次购买？
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-8 sm:mb-10">
            我们提供7天无理由退货，以及全程客服支持。您的满意是我们最大的动力。
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-medium text-base sm:text-lg md:text-xl transition-all"
          >
            开始选购
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-12 text-center text-zinc-500 text-sm">
        © 2026 [品牌名] · 隐私保护 · 日本直邮
      </footer>
    </main>
  );
}
