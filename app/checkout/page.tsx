'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">结账</h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {['填写信息', '选择支付', '确认订单'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1 ? 'bg-orange-500 text-white' :
                step === i + 1 ? 'bg-orange-500/20 text-orange-400 border border-orange-500' :
                'bg-zinc-800 text-zinc-400'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={step >= i + 1 ? 'text-white' : 'text-zinc-500'}>{s}</span>
              {i < 2 && <span className="text-zinc-600 mx-2">→</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">收货地址</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">姓名</label>
                    <input type="text" placeholder="山田太郎" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">电话号码</label>
                    <input type="tel" placeholder="090-1234-5678" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">邮编</label>
                  <input type="text" placeholder="123-4567" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">地址</label>
                  <input type="text" placeholder="东京都涩谷区..." className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" />
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all mt-4">
                  下一步
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">支付方式</h2>
                {['PayPal', '信用卡', '便利店付款'].map((method) => (
                  <label key={method} className="flex items-center gap-3 p-4 bg-zinc-800 rounded-xl cursor-pointer hover:bg-zinc-700 transition-all">
                    <input type="radio" name="payment" className="w-5 h-5 accent-orange-500" />
                    <span>{method}</span>
                  </label>
                ))}
                <div className="flex gap-4 mt-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-all">
                    上一步
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all">
                    下一步
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">确认订单</h2>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex justify-between">
                    <span>商品1 x1</span>
                    <span>¥3,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>商品2 x1</span>
                    <span>¥5,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>运费</span>
                    <span>¥1,000</span>
                  </div>
                  <div className="border-t border-zinc-700 pt-3 flex justify-between text-lg font-bold">
                    <span>总计</span>
                    <span className="text-orange-400">¥10,000</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-all">
                    修改
                  </button>
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all">
                    提交订单
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
            <h3 className="font-semibold mb-4">订单摘要</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>商品小计</span>
                <span>¥9,000</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>运费</span>
                <span>¥1,000</span>
              </div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between font-bold">
                <span>总计</span>
                <span className="text-orange-400">¥10,000</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-zinc-800 rounded-xl">
              <p className="text-xs text-zinc-400">🔒 隐私保护：您的个人信息将被加密处理，快递单仅显示"生活用品"。</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
