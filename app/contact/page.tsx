'use client';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">联系我们</h1>
        <p className="text-zinc-400 mb-8">商务合作或咨询，请填写以下表单</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
          <form className="space-y-6">
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">您的姓名</label>
              <input type="text" placeholder="请输入姓名" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">邮箱地址</label>
              <input type="email" placeholder="example@email.com" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" />
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">咨询类型</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500">
                <option>商品咨询</option>
                <option>订单查询</option>
                <option>商务合作</option>
                <option>其他</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">留言内容</label>
              <textarea rows={5} placeholder="请详细描述您的需求..." className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 resize-none" />
            </div>

            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl transition-all">
              发送消息
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-sm text-zinc-400 text-center">
              我们通常在1-2个工作日内回复
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
