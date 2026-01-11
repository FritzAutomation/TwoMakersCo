import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  imageUrl?: string | null;
  slug: string;
  category?: string | null;
  variant?: "featured" | "shop";
  priority?: boolean;
}

export default function ProductCard({
  name,
  price,
  image_url,
  imageUrl,
  slug,
  category,
  variant = "featured",
  priority = false,
}: ProductCardProps) {
  const productImage = imageUrl || image_url;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  return (
    <Link href={`/shop/${slug}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10">
        {productImage ? (
          <Image
            src={productImage}
            alt={name}
            width={400}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full relative overflow-hidden">
            {/* Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-transparent" />
            {/* Clouds */}
            <div className="absolute top-4 left-8 w-16 h-6 bg-white/80 rounded-full blur-sm" />
            <div className="absolute top-6 left-16 w-12 h-4 bg-white/60 rounded-full blur-sm" />
            <div className="absolute top-3 right-12 w-14 h-5 bg-white/70 rounded-full blur-sm" />
            {/* Hills */}
            <div className="absolute bottom-0 left-0 right-0 h-3/4">
              <div className="absolute bottom-0 left-[-20%] w-[70%] h-full bg-green-400 rounded-t-full" />
              <div className="absolute bottom-0 right-[-10%] w-[60%] h-[90%] bg-green-500 rounded-t-full" />
              <div className="absolute bottom-0 left-[20%] w-[80%] h-[70%] bg-green-300 rounded-t-full" />
            </div>
            {/* Label */}
            <span className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-medium">
              Product Image
            </span>
          </div>
        )}
      </div>
      {category && (
        <p className="mt-2 text-14 text-brown/60 font-medium">{category}</p>
      )}
      <h3 className={`${category ? "mt-1" : "mt-3"} font-semibold text-brown ${variant === "featured" ? "text-18" : "text-19"}`}>
        {name}
      </h3>
      <p className={`text-brown font-normal ${variant === "featured" ? "text-17" : "text-19"}`}>
        {formattedPrice}
      </p>
    </Link>
  );
}
