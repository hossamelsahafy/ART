"use client";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchOverlay({ showSearch, setShowSearch, locale }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=10000`
        );
        const data = await response.json();
        setProducts(data.docs);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered =
      searchTerm == ""
        ? []
        : products.filter(
            (product) =>
              product.descriptionAr.toLowerCase().includes(searchTerm) ||
              product.descriptionEn.toLowerCase().includes(searchTerm) ||
              product.category.titleAr.toLowerCase().includes(searchTerm) ||
              product.category.titleEn.toLowerCase().includes(searchTerm)
          );
    setFilteredProducts(filtered);
  };

  if (!showSearch) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.9)] z-[10000] flex flex-col justify-center ">
      <IoClose
        className="absolute top-4 right-4 text-white text-4xl cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
      <div className="flex items-center justify-center">
        <div className="bg-[#d4af37] p-3 flex items-center justify-center rounded-md shadow-md">
          <FiSearch className="text-white text-2xl" />
        </div>

        <div className="w-2"></div>

        <div className="flex items-center w-2/3 max-w-md bg-white rounded-md shadow-md overflow-hidden">
          <input
            value={searchTerm}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Search..."
            className="w-full p-3 outline-none border-none bg-transparent text-black"
          />
        </div>
      </div>
      <div
        className={`flex flex-col gap-3 mt-3 mx-auto ${filteredProducts.length > 0 ? "h-[60vh]" : "h-0"} duration-300 overflow-y-auto`}
      >
        {filteredProducts.length > 0 &&
          filteredProducts.map((product, index) => (
            <div
              onClick={() => {
                setShowSearch(false);
                localStorage.setItem(
                  "category",
                  JSON.stringify({
                    titleAr: product.category.titleAr,
                    titleEn: product.category.titleEn,
                  })
                );
                router.push(`/${locale}/products/${product.id}`);
              }}
              className="max-w-lg bg-white bg-opacity-15 p-3 rounded-xl flex items-center gap-5 cursor-pointer"
              key={index}
            >
              <Image
                alt=""
                src={product.images?.[0]?.image?.url}
                width={100}
                height={100}
                className="rounded-xl"
              />
              <p className="line-clamp-2">
                {locale == "ar" ? product.descriptionAr : product.descriptionEn}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
