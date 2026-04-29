'use client';
import Link from 'next/link';
import { products } from '@/lib/products';

export default function CartPage() {
  // Demo: 假设购物车里有前两个商品
  const cartItems = products.slice(0, 2);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">购物车</h1>

        {cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4">
                  <div className="w-24 h-24 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-zinc-400 text-sm">{item.nameEn}</p>
                    <p className="text-orange-400 mt-2">¥{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button className="text-zinc-500 hover:text-red-400 text-sm">删除</button>
                    <span className="text-zinc-400 text-sm">x1</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400">商品件数</span>
                <span>{cartItems.length} 件</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400">运费</span>
                <span>¥1,000（日本直邮）</span>
              </div>
              <div className="border-t border-zinc-800 pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>总计</span>
                  <span className="text-orange-400">¥{(total + 1000).toLocaleString()}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl text-center transition-all"
              >
                去结账
              </Link>
              <p className="text-center text-zinc-500 text-sm mt-4">
                🔒 隐私保护：结账页面采用加密连接
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-400 mb-6">购物车是空的</p>
            <Link href="/products" className="text-orange-400 hover:text-orange-300 font-medium">
              去选购 →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
