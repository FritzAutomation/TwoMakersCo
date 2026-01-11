import { createClient } from './server'

export interface Review {
  id: string
  product_id: string
  user_id: string | null
  author_name: string
  author_email: string
  rating: number
  title: string | null
  content: string | null
  is_verified_purchase: boolean
  is_approved: boolean
  created_at: string
  updated_at: string
}

export interface ReviewWithProduct extends Review {
  products: {
    name: string
    slug: string
  }
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return data || []
}

export async function getProductRatingStats(productId: string): Promise<{ average: number; count: number }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId)
    .eq('is_approved', true)

  if (error || !data || data.length === 0) {
    return { average: 0, count: 0 }
  }

  const total = data.reduce((sum, r) => sum + r.rating, 0)
  return {
    average: Math.round((total / data.length) * 10) / 10,
    count: data.length
  }
}

export async function submitReview(review: {
  productId: string
  authorName: string
  authorEmail: string
  rating: number
  title?: string
  content?: string
  userId?: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Check if user has purchased this product (for verified purchase badge)
  let isVerifiedPurchase = false
  if (review.userId) {
    const { data: orders } = await supabase
      .from('order_items')
      .select('orders!inner(user_id)')
      .eq('product_id', review.productId)
      .eq('orders.user_id', review.userId)
      .limit(1)

    isVerifiedPurchase = (orders?.length || 0) > 0
  }

  const { error } = await supabase
    .from('reviews')
    .insert({
      product_id: review.productId,
      user_id: review.userId || null,
      author_name: review.authorName,
      author_email: review.authorEmail,
      rating: review.rating,
      title: review.title || null,
      content: review.content || null,
      is_verified_purchase: isVerifiedPurchase,
      is_approved: false, // Reviews need admin approval
    })

  if (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// Admin functions
export async function getAllReviews(): Promise<ReviewWithProduct[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*, products(name, slug)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all reviews:', error)
    return []
  }

  return data || []
}

export async function getPendingReviews(): Promise<ReviewWithProduct[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*, products(name, slug)')
    .eq('is_approved', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pending reviews:', error)
    return []
  }

  return data || []
}

export async function approveReview(reviewId: string): Promise<{ success: boolean }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('reviews')
    .update({ is_approved: true, updated_at: new Date().toISOString() })
    .eq('id', reviewId)

  return { success: !error }
}

export async function deleteReview(reviewId: string): Promise<{ success: boolean }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  return { success: !error }
}
