import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  slug: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  slug,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  return (
    <Link href={`/shop/${slug}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-lg bg-white border border-brown/10">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
            <span className="text-brown/30 text-sm">Product Image</span>
          </div>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-brown">{name}</h3>
      <p className="text-brown/80">{formattedPrice}</p>
    </Link>
  );
}
