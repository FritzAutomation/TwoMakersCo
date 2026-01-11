import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user (optional)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json();
    const { productId, rating, title, content, authorName, authorEmail } = body;

    // Validation
    if (!productId || !rating || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user has purchased this product (for verified purchase badge)
    let isVerifiedPurchase = false;
    if (user) {
      const { data: orderItems } = await supabase
        .from("order_items")
        .select("id, orders!inner(user_id)")
        .eq("product_id", productId)
        .eq("orders.user_id", user.id)
        .limit(1);

      isVerifiedPurchase = (orderItems?.length || 0) > 0;
    }

    // Insert review
    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      user_id: user?.id || null,
      author_name: authorName,
      author_email: authorEmail,
      rating,
      title: title || null,
      content: content || null,
      is_verified_purchase: isVerifiedPurchase,
      is_approved: false, // Reviews need admin approval
    });

    if (error) {
      console.error("Error inserting review:", error);
      return NextResponse.json(
        { error: "Failed to submit review" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in reviews API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
