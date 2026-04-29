-- ============================================================
-- adult-shop Supabase 建表脚本
-- 运行方式：Supabase Dashboard → SQL Editor → 粘贴执行
-- ============================================================

-- products 表
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT DEFAULT '',
  price INTEGER DEFAULT 0,
  category TEXT DEFAULT '',
  image TEXT DEFAULT '',
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  description TEXT DEFAULT '',
  features TEXT[] DEFAULT '{}',
  discreet BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- orders 表
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  customer_name TEXT DEFAULT '',
  customer_email TEXT DEFAULT '',
  customer_address TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 初始产品数据（原有硬编码数据迁移）
-- ============================================================

INSERT INTO products (name, name_en, price, category, image, rating, reviews, description, features, discreet) VALUES
(
  '隐蔽系列 A',
  'Classic Series A',
  3800,
  '隐蔽系列',
  'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=A',
  4.8,
  124,
  '经典设计，隐蔽包装，快递单只显示"生活用品"，保护您的隐私。',
  '{"隐蔽包装", "日本直邮", "7天无理由", "防水设计"}',
  true
),
(
  '隐蔽系列 B',
  'Premium Series B',
  5200,
  '隐蔽系列',
  'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=B',
  4.9,
  89,
  '高端定位，附带收纳盒，适合自用或送礼。',
  '{"隐蔽包装", "高档礼盒", "日本直邮", "防水设计"}',
  true
),
(
  '便携系列 C',
  'Mini Series C',
  2800,
  '便携系列',
  'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=C',
  4.7,
  203,
  '小巧轻便，方便携带，随时随地使用。',
  '{"隐蔽包装", "便携设计", "日本直邮", "静音运行"}',
  true
),
(
  '高端系列 D',
  'Luxury Series D',
  8800,
  '高端系列',
  'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=D',
  5.0,
  56,
  '旗舰级产品，最高配置，极致体验。',
  '{"隐蔽包装", "旗舰配置", "日本直邮", "防水设计", "无线充电"}',
  true
),
(
  '新手入门套装',
  'Starter Kit',
  6800,
  '套装',
  'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=Kit',
  4.6,
  312,
  '新手首选，配备齐全，省心组合。',
  '{"隐蔽包装", "新手友好", "日本直邮", "赠送润滑剂"}',
  true
),
(
  '情侣套装 E',
  'Couple Series E',
  12800,
  '套装',
  'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=E',
  4.9,
  78,
  '双人套装，增进感情，享受亲密时光。',
  '{"隐蔽包装", "双人设计", "日本直邮", "精美礼盒"}',
  true
);
