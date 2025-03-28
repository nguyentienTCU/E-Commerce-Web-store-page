export const getCollections = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  const data = await res.json();
  return data;
};

export const getProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const data = await res.json();
  return data;
};
