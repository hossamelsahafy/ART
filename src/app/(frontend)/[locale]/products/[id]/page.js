import { notFound } from "next/navigation";
import ProductClient from "../../../_components/product/productClient";

async function fetchProduct(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return notFound();
  }

  return <ProductClient product={product} />;
}
