-- 禁用 RLS，让产品表公开可读
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- 允许所有人读写（开发阶段）
GRANT ALL ON products TO anon, authenticated;
GRANT ALL ON orders TO anon, authenticated;
