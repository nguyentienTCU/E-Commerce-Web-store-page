import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./Heart";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      ></Image>
      <div>
        <p className="base-bold">{product.title}</p>
        <p className="small-medium grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="body-bold">${product.price}</p>
        <HeartFavorite productInfo={product} />
      </div>
    </Link>
  );
};

export default ProductCard;
