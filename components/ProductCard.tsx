import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./Heart";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group w-[280px] flex flex-col gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={product.media[0]}
          alt="product"
          width={280}
          height={300}
          className="h-[280px] w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <HeartFavorite
            productInfo={product}
            updateSignedInUser={updateSignedInUser}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-xl font-bold text-blue-600">${product.price}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
