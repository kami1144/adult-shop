'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">关于我们</h1>

        <div className="space-y-8">
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">我们的承诺</h2>
            <p className="text-zinc-300 leading-relaxed">
              我们致力于为日本市场的消费者提供高品质、设计精美的产品。我们理解隐私对您的重要性，因此所有订单都采用100%隐蔽包装，确保您的购物体验完全保密。
            </p>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">隐私保护</h2>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>快递单仅显示"生活用品"，无任何敏感信息</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>外包装采用全封闭设计，旁人无法知晓内容</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>支付信息采用加密处理，保障交易安全</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✓</span>
                <span>我们不会向任何第三方透露您的个人信息</span>
              </li>
            </ul>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">配送说明</h2>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">✈️</span>
                <span>日本仓库直邮，7-10个工作日到货</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">📦</span>
                <span>全隐蔽包装，隐私无忧</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">💰</span>
                <span>7天无理由退货（商品未拆封）</span>
              </li>
            </ul>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">联系我们</h2>
            <p className="text-zinc-300 mb-4">
              如有任何问题，欢迎通过以下方式联系我们：
            </p>
            <div className="space-y-2 text-zinc-400">
              <p>📧 support@[品牌名].com</p>
              <p>⏰ 工作时间：平日 10:00-18:00（日本时间）</p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/products" className="text-orange-400 hover:text-orange-300 font-medium">
            ← 返回商品列表
          </Link>
        </div>
      </div>
    </main>
  );
}
