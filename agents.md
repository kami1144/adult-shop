# 成人用品电商 · agents.md

## 项目背景

成人用品电商独立站，面向日本市场，支持隐私发货。

**线上地址**：待部署

**技术栈**：Next.js 14 (App Router) + TypeScript + Tailwind CSS

**代码仓库**：https://github.com/kami1144/adult-shop-mvp

**负责人**：Kim Kami（老大）

---

## 团队规则

### 协作流程
1. architect 接收任务 → 拆解为具体步骤 → 分配给 engineer
2. engineer 执行 → 每步验证 → commit + push
3. 重大变更需architect确认后再实施

### 代码规范
- 深色背景(#09090b) + 橙色主亮点(#f59e0b)
- 页面：首页/产品列表/产品详情/购物车/结账/关于我们/联系合作
- components 需统一设计语言
- 所有支付/物流信息仅展示，暂不实际接入

### Git 规范
- commit message 格式：`feat:` `fix:` `chore:` `refactor:`
- 每次部署前确认 build 通过

---

## 作用范围

### 当前进行中
- 基础框架搭建（talent-nft-mvp 模板改造）
- 页面内容替换为成人用品电商

### 已完成
- 项目框架搭建

### 禁止事项
- 不得在代码中包含实际交易逻辑
- 不得引入任何支付网关真实密钥

---

## 页面结构

| 页面 | 路径 | 状态 |
|------|------|------|
| 首页 | / | 待开发 |
| 产品列表 | /products | 待开发 |
| 产品详情 | /products/[id] | 待开发 |
| 购物车 | /cart | 待开发 |
| 结账 | /checkout | 待开发 |
| 关于我们 | /about | 待开发 |
| 联系合作 | /contact | 待开发 |

---

## 技术备忘

- 本地端口：localhost:3000（Next.js dev server）
- Vercel 部署：推送后自动触发
