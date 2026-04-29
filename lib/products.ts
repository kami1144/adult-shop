export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  discreet: boolean; // 隐私发货
}

export const products: Product[] = [
  {
    id: '1',
    name: '隐蔽系列 A',
    nameEn: 'Classic Series A',
    price: 3800,
    category: '隐蔽系列',
    image: 'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=A',
    rating: 4.8,
    reviews: 124,
    description: '经典设计，隐蔽包装，快递单只显示"生活用品"，保护您的隐私。',
    features: ['隐蔽包装', '日本直邮', '7天无理由', '防水设计'],
    discreet: true,
  },
  {
    id: '2',
    name: '隐蔽系列 B',
    nameEn: 'Premium Series B',
    price: 5200,
    category: '隐蔽系列',
    image: 'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=B',
    rating: 4.9,
    reviews: 89,
    description: '高端定位，附带收纳盒，适合自用或送礼。',
    features: ['隐蔽包装', '高档礼盒', '日本直邮', '防水设计'],
    discreet: true,
  },
  {
    id: '3',
    name: '便携系列 C',
    nameEn: 'Mini Series C',
    price: 2800,
    category: '便携系列',
    image: 'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=C',
    rating: 4.7,
    reviews: 203,
    description: '小巧轻便，方便携带，随时随地使用。',
    features: ['隐蔽包装', '便携设计', '日本直邮', '静音运行'],
    discreet: true,
  },
  {
    id: '4',
    name: '高端系列 D',
    nameEn: 'Luxury Series D',
    price: 8800,
    category: '高端系列',
    image: 'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=D',
    rating: 5.0,
    reviews: 56,
    description: '旗舰级产品，最高配置，极致体验。',
    features: ['隐蔽包装', '旗舰配置', '日本直邮', '防水设计', '无线充电'],
    discreet: true,
  },
  {
    id: '5',
    name: '新手入门套装',
    nameEn: 'Starter Kit',
    price: 6800,
    category: '套装',
    image: 'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=Kit',
    rating: 4.6,
    reviews: 312,
    description: '新手首选，配备齐全，省心组合。',
    features: ['隐蔽包装', '新手友好', '日本直邮', '赠送润滑剂'],
    discreet: true,
  },
  {
    id: '6',
    name: '情侣套装 E',
    nameEn: 'Couple Series E',
    price: 12800,
    category: '套装',
    image: 'https://via.placeholder.com/400x400/1a1a1a/f59e0b?text=E',
    rating: 4.9,
    reviews: 78,
    description: '双人套装，增进感情，享受亲密时光。',
    features: ['隐蔽包装', '双人设计', '日本直邮', '精美礼盒'],
    discreet: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export const categories = ['全部', '隐蔽系列', '便携系列', '高端系列', '套装'];
