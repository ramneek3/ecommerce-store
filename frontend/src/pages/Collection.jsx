import React, { useEffect, useState } from "react";
import axios from "axios";
import { productImages } from "../assets/productImages";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

// --- Local fallback products (only used if backend fails) ---
const fallbackProducts = [
  {
    _id: "shirt",
    name: "top  for women",
    price: 29,
    images: productImages.shirt,     // make sure productImages.shirt exists
  },
  {
    _id: "mensShirt",
    name: "Men’s Pure Fit Shirt",
    price: 74,
    images: productImages.mensShirt, // make sure productImages.mensShirt exists
  },
];

const Collection = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // 👈 from CartContext

  // --- Load from backend, else fall back to local products ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log("⚠️ Backend not available — showing fallback products");
        console.error(err);
        setProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  // Click → Navigate to product detail page
  const goToProduct = (id) => navigate(`/product/${id}`);

  const handleAddToCart = (product) => {
    // Call global cart handler (if available), then show alert
    try {
      if (typeof addToCart === "function") addToCart(product);
    } catch (err) {
      console.warn("addToCart context error:", err);
    }
    alert(`${product.name} added to cart!`);
  };


  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">ALL COLLECTIONS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p._id || p.name}
            className="border rounded-xl p-4 cursor-pointer bg-white shadow-sm hover:shadow-md flex flex-col"
          >
            {/* Clickable Image */}
            <img
              src={p.image || p.images?.main} // backend may use p.image
              alt={p.name}
              className="rounded-lg w-full h-72 object-cover"
              onClick={() => goToProduct(p._id || p.name)}
            />

            {/* Name + Price */}
            <div className="mt-3">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-gray-600 text-md">${p.price}</p>
            </div>

            {/* Add to Cart */}
            <button
              className="border mt-4 px-4 py-2 text-sm rounded-lg hover:bg-black hover:text-white self-start"
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;