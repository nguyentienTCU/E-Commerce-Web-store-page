import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-[16/9] mb-8">
            <Image
              src="/banner.png"
              alt="Welcome to our store"
              fill
              priority
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to our store
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest collection of products
            </p>
          </div>
        </div>
      </div>
      <Collections />
      <ProductList />
    </div>
  );
}
