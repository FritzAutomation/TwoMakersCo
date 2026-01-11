import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ productIds: [] });
    }

    const { data, error } = await supabase
      .from("wishlist")
      .select("product_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching wishlist:", error);
      return NextResponse.json({ productIds: [] });
    }

    return NextResponse.json({
      productIds: data?.map((item) => item.product_id) || [],
    });
  } catch (error) {
    console.error("Error in wishlist GET:", error);
    return NextResponse.json({ productIds: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("wishlist")
      .insert({ user_id: user.id, product_id: productId });

    if (error) {
      // Ignore duplicate key errors
      if (error.code !== "23505") {
        console.error("Error adding to wishlist:", error);
        return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in wishlist POST:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) {
      console.error("Error removing from wishlist:", error);
      return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in wishlist DELETE:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
