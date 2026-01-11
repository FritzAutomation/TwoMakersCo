import { createClient } from './server'
import type { Product } from './products'

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

export async function getWishlist(userId: string): Promise<WishlistItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, product:products(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching wishlist:', error)
    return []
  }

  return data || []
}

export async function isInWishlist(userId: string, productId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()

  if (error) return false
  return !!data
}

export async function addToWishlist(userId: string, productId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('wishlist')
    .insert({ user_id: userId, product_id: productId })

  if (error) {
    // Ignore duplicate key errors
    if (error.code === '23505') {
      return { success: true }
    }
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function removeFromWishlist(userId: string, productId: string): Promise<{ success: boolean }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  return { success: !error }
}

export async function getWishlistProductIds(userId: string): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('wishlist')
    .select('product_id')
    .eq('user_id', userId)

  if (error) return []
  return data?.map(item => item.product_id) || []
}
