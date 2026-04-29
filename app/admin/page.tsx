'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/lib/supabase'

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({
    name: '',
    name_en: '',
    price: 0,
    category: '',
    image: '',
    rating: 0,
    reviews: 0,
    description: '',
    features: '',
    discreet: true,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      ...form,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
      price: Number(form.price),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
    }

    if (editing) {
      await fetch(`/api/products/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    setEditing(null)
    setForm({ name: '', name_en: '', price: 0, category: '', image: '', rating: 0, reviews: 0, description: '', features: '', discreet: true })
    fetchProducts()
  }

  async function handleDelete(id: string) {
    if (!confirm('确定删除？')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    fetchProducts()
  }

  function startEdit(p: Product) {
    setEditing(p)
    setForm({
      name: p.name,
      name_en: p.name_en,
      price: p.price,
      category: p.category,
      image: p.image,
      rating: p.rating,
      reviews: p.reviews,
      description: p.description,
      features: p.features.join(', '),
      discreet: p.discreet,
    })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🛒 商品管理</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 产品列表 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">产品列表</h2>
          {loading ? (
            <p className="text-zinc-400">加载中...</p>
          ) : products.length === 0 ? (
            <p className="text-zinc-400">暂无产品，请先添加</p>
          ) : (
            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="bg-zinc-900 rounded-lg p-4 flex gap-4 items-center">
                  <img src={p.image} alt={p.name} className="w-16 h-16 rounded object-cover bg-zinc-800" />
                  <div className="flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-zinc-400">¥{p.price} · {p.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(p)} className="px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded text-sm">编辑</button>
                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">删除</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 添加/编辑表单 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{editing ? '✏️ 编辑产品' : '➕ 添加产品'}</h2>
          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">产品名称</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">英文名</label>
                <input value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">价格 (円)</label>
                <input type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} required className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">分类</label>
                <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">图片 URL</label>
              <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">评分</label>
                <input type="number" step="0.1" max="5" value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">评论数</label>
                <input type="number" value={form.reviews} onChange={e => setForm({...form, reviews: Number(e.target.value)})} className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">隐私发货</label>
                <select value={form.discreet ? 'true' : 'false'} onChange={e => setForm({...form, discreet: e.target.value === 'true'})} className="w-full bg-zinc-800 rounded px-3 py-2 text-white">
                  <option value="true">是</option>
                  <option value="false">否</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">描述</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">特点（逗号分隔）</label>
              <input value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="隐蔽包装, 日本直邮, 7天无理由" className="w-full bg-zinc-800 rounded px-3 py-2 text-white" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 py-2 rounded font-semibold">
                {editing ? '保存修改' : '添加产品'}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm({ name: '', name_en: '', price: 0, category: '', image: '', rating: 0, reviews: 0, description: '', features: '', discreet: true }) }} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded">
                  取消
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
