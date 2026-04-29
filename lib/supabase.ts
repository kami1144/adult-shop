import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: string
  name: string
  name_en: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  description: string
  features: string[]
  discreet: boolean
  created_at: string
}

export interface Order {
  id: string
  product_id: string
  quantity: number
  customer_name: string
  customer_email: string
  customer_address: string
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  created_at: string
}
