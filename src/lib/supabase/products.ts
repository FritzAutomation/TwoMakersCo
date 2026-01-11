import { createClient } from './server'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  details: string | null
  price: number
  image_url: string | null
  images: string[] | null
  is_featured: boolean
  stock: number
  category_id: string | null
  category?: Category | null
  created_at: string
  updated_at: string
}

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'name'
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export async function getFilteredProducts(filters: ProductFilters): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, category:categories(*)')

  // Filter by category slug
  if (filters.category) {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', filters.category)
      .single()

    if (categoryData) {
      query = query.eq('category_id', categoryData.id)
    }
  }

  // Search by name or description
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  // Price filters
  if (filters.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice * 100)
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice * 100)
  }

  // Sorting
  switch (filters.sortBy) {
    case 'price-low':
      query = query.order('price', { ascending: true })
      break
    case 'price-high':
      query = query.order('price', { ascending: false })
      break
    case 'name':
      query = query.order('name', { ascending: true })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching filtered products:', error)
    return []
  }

  return data || []
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = await createClient()

  // First get the category ID
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!categoryData) return []

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('category_id', categoryData.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data || []
}
