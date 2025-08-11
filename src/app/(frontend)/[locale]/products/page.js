"use client";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SepProducts = () => {
  const t = useTranslations();
  const { locale } = useParams();
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    async function fetchAllProducts(category) {
      let allProducts = [];
      let currentPage = 1;
      let hasNextPage = true;

      try {
        while (hasNextPage) {
          const response = await fetch(
            `/api/products?page=${currentPage}&depth=2`
          );
          const data = await response.json();
          // console.log(data.docs[0].category.titleEn);
          allProducts = [...allProducts, ...data.docs];
          hasNextPage = data.hasNextPage;
          currentPage++;
        }
        console.log(allProducts);
        console.log(category);
        const filtered = allProducts.filter(
          (product) =>
            product.category &&
            product.category.titleEn &&
            product.category.titleEn === category.titleEn
        );
        console.log(filtered);

        setFilteredProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    const storedCategory = localStorage.getItem("category");

    if (storedCategory) {
      fetchAllProducts(JSON.parse(storedCategory));
    } else {
      console.error("No category found in sessionStorage.");
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="mt-32 mb-20 flex flex-col items-center justify-center">
          <div className="rounded-full h-24 w-24 border-primary border-4 border-t-transparent animate-spin" />
          <p className="text-white text-xl text-center mt-5 animate-pulse">
            {t("Loading")}
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-12 my-16 w-full max-w-[1200px] mx-auto px-5">
          {filteredProducts.map((product) => (
            <Link
              key={product.id || product._id}
              href={`/${locale}/products/${product.id || product._id}`}
            >
              <img
                src={product.images?.[0]?.image?.url}
                className="w-full object-contain rounded-lg hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SepProducts;
