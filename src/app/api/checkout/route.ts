import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  slug: string;
}

interface CheckoutRequest {
  items: CartItem[];
  shipping: {
    email: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, shipping, subtotal, shippingCost, tax, total } = body;

    // Validate request
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!shipping.email || !shipping.name || !shipping.address) {
      return NextResponse.json(
        { error: "Missing shipping information" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get current user (optional - guests can checkout)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id || null,
        status: "confirmed",
        email: shipping.email,
        shipping_name: shipping.name,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_zip: shipping.zip,
        subtotal,
        shipping_cost: shippingCost,
        tax,
        total,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items error:", itemsError);
      // Order was created, just log the error
    }

    // TODO: Integrate with Square for actual payment processing
    // For now, we're just creating the order in demo mode

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
