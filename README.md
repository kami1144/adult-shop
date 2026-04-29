# 星火种子 - Talent NFT MVP Frontend

区块链人才投资平台前端，10学生试点版。

## 技术栈

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- **wagmi v2** + **viem** (Web3钱包连接)
- **@rainbow-me/rainbowkit** (钱包连接UI)

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
├── app/
│   ├── layout.tsx          # Root layout + Web3 providers
│   ├── page.tsx            # Homepage (10 student cards)
│   ├── globals.css         # Tailwind styles
│   └── student/[id]/page.tsx  # Student detail page
├── components/             # (预留组件目录)
├── lib/
│   └── students.ts         # 10学生模拟数据
└── package.json
```

## 功能

### 首页 (/)
- 平台介绍 + 统计数据
- 10学生卡片网格
- 筹资进度条
- RainbowKit 钱包连接

### 学生详情页 (/student/[id])
- 学生档案 + 成就展示
- AI估值分显示
- 筹资进度详情
- 投资模态框（输入金额 + 预期回报）

## 页面截图

首页：学生卡片网格 + 筹资进度条
详情页：完整档案 + 投资按钮 + 投资模态框

## 下一步

1. 配置wagmi的RPC URL和钱包连接器
2. 对接智能合约（部署到Polygon Amoy后）
3. 添加真实的学生数据和NFT铸造流程
4. 实现钱包签名和交易流程

## 智能合约

配套智能合约位于 `../` 目录：
- TalentNFT.sol - 成绩NFT合约
- InvestmentPool.sol - 投资分账合约

部署命令：
```bash
cd ..
forge script scripts/deploy.sol:Deploy --rpc-url polygon_amoy --broadcast
```
