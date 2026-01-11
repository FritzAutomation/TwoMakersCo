import { createClient } from './server'

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  return profile?.is_admin === true
}

export async function getProfile(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getAllOrders() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data || []
}

export async function getOrderById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching order:', error)
    return null
  }

  return data
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error updating order:', error)
    return false
  }

  return true
}

export async function getAdminStats() {
  const supabase = await createClient()

  // Get product count
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  // Get order counts by status
  const { data: orders } = await supabase
    .from('orders')
    .select('status, total')

  const orderStats = {
    total: orders?.length || 0,
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    confirmed: orders?.filter(o => o.status === 'confirmed').length || 0,
    shipped: orders?.filter(o => o.status === 'shipped').length || 0,
    delivered: orders?.filter(o => o.status === 'delivered').length || 0,
    revenue: orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0,
  }

  return {
    productCount: productCount || 0,
    orderStats,
  }
}

export async function getAllCustomers() {
  const supabase = await createClient()

  // Get all profiles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }

  // Get order stats for each customer
  const customersWithStats = await Promise.all(
    (profiles || []).map(async (profile) => {
      const { data: orders } = await supabase
        .from('orders')
        .select('id, total, created_at')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })

      return {
        ...profile,
        order_count: orders?.length || 0,
        total_spent: orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0,
        last_order_date: orders?.[0]?.created_at || null,
      }
    })
  )

  return customersWithStats
}

export async function getGuestCustomers() {
  const supabase = await createClient()

  // Get all orders without a user_id (guest orders)
  const { data: guestOrders, error } = await supabase
    .from('orders')
    .select('email, shipping_name, total, created_at')
    .is('user_id', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching guest orders:', error)
    return []
  }

  // Group by email
  const guestMap = new Map<string, {
    email: string
    name: string
    order_count: number
    total_spent: number
    last_order_date: string
  }>()

  for (const order of guestOrders || []) {
    const existing = guestMap.get(order.email)
    if (existing) {
      existing.order_count += 1
      existing.total_spent += order.total || 0
    } else {
      guestMap.set(order.email, {
        email: order.email,
        name: order.shipping_name || 'Guest',
        order_count: 1,
        total_spent: order.total || 0,
        last_order_date: order.created_at,
      })
    }
  }

  return Array.from(guestMap.values())
}

export async function getCustomerById(userId: string) {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    return null
  }

  return profile
}

export async function getCustomerOrders(userId: string) {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items (*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customer orders:', error)
    return []
  }

  return orders || []
}

export async function getGuestOrders(email: string) {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items (*)')
    .eq('email', email)
    .is('user_id', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching guest orders:', error)
    return []
  }

  return orders || []
}
