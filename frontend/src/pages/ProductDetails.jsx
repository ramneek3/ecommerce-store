import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productImages } from "../assets/productImages";
import { useCart } from "../context/CartContext.jsx";

// Local products that match your IDs in Collection.jsx
const localProducts = {
  shirt: {
    _id: "shirt",
    name: "top  for women",
    price: 29,
    description:
      "Soft and comfortable top for women. Perfect for casual outings and daily wear.",
    images: productImages.shirt,       // { main, side, back, ... }
  },
  mensShirt: {
    _id: "mensShirt",
    name: "Men’s Pure Fit Shirt",
    price: 74,
    description:
      "Slim fit shirt with a clean design, ideal for formal and semi-formal occasions.",
    images: productImages.mensShirt,   // { main, side, back, ... }
  },
};

const ProductDetails = () => {
  const { id } = useParams();               // URL: /product/:id  -> "shirt" / "mensShirt"
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = localProducts[id] || null;
  const [activeImage, setActiveImage] = useState("");

  // Set the main image when product changes
  useEffect(() => {
    if (product && product.images) {
      setActiveImage(product.images.main);
    }
  }, [product]);

  // If product not found, show fallback message
  if (!product) {
    return (
      <div className="p-6">
        <p>Product not found.</p>
        <button
          onClick={() => navigate("/collection")}
          className="mt-3 underline"
        >
          Back to collection
        </button>
      </div>
    );
  }

  // All images (main, side, back, etc.) as an array for thumbnails
  const imageList = Object.values(product.images || {});

  const handleAddToCart = () => {
    try {
      if (typeof addToCart === "function") {
        addToCart(product);
      }
    } catch (err) {
      console.warn("addToCart context error:", err);
    }
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 underline text-sm">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: main image + thumbnails */}
        <div>
          {/* Main image */}
          {activeImage && (
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow"
            />
          )}

          {/* Thumbnails */}
          {imageList.length > 1 && (
            <div className="flex gap-3 mt-4">
              {imageList.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx}`}
                  className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${
                    img === activeImage ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: text + Add to Cart */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="border border-black px-4 py-2 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;