import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { productImages } from "../assets/productImages";
import { useCart } from "../context/CartContext.jsx";

// same IDs as in Collection.jsx
const fallbackProducts = [
  {
    _id: "shirt",
    name: "top  for women",
    price: 39,
    images: productImages.shirt,      // { main, side, back, zoom ... }
  },
  {
    _id: "mensShirt",
    name: "Men’s Pure Fit Shirt",
    price: 54,
    images: productImages.mensShirt,
  },
];

const ProductDetails = () => {
  const { id } = useParams();

  // be defensive in case context is not ready
  const cartContext = useCart() || {};
  const addToCart =
    typeof cartContext.addToCart === "function"
      ? cartContext.addToCart
      : () => {};

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      try {
        // try backend first
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const p = res.data;
        setProduct(p);

        // if backend already gives an array of images, use that
        const imgs =
          Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : [p.image].filter(Boolean);

        setImages(imgs);
        setActiveImage(imgs[0] || "");
      } catch (err) {
        console.warn("Backend product fetch failed, using fallback:", err);

        // fallback to local products
        const fallback = fallbackProducts.find((fp) => fp._id === id);
        if (fallback) {
          setProduct(fallback);

          const imgsObj = fallback.images || {};
          const imgs =
            Array.isArray(imgsObj) && imgsObj.length > 0
              ? imgsObj
              : Object.values(imgsObj).filter(Boolean);

          setImages(imgs);
          setActiveImage(imgs[0] || "");
        } else {
          setProduct(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const incQty = () => setQty((q) => q + 1);
  const decQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;
    // supports both addToCart(product) and addToCart(product, qty)
    try {
      addToCart(product, qty);
    } catch {
      addToCart(product);
    }
    alert(`${product.name} added to cart (${qty})`);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="p-6">
        <p>Product not found.</p>
        <Link to="/collection" className="underline text-blue-600">
          Back to collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left – big image + thumbnails */}
      <div>
        {activeImage && (
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-[420px] object-cover rounded-xl mb-4"
          />
        )}

        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`w-20 h-20 rounded-lg overflow-hidden border ${
                img === activeImage ? "border-black" : "border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <Link to="/collection" className="mt-4 inline-block text-sm underline">
          ← Back to collection
        </Link>
      </div>

      {/* Right – info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-2xl font-bold">${product.price}</p>

        <p className="text-gray-600">
          Lorem ipsum description for {product.name}. You can replace this with
          real details later.
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-4 mt-4">
          <span className="text-sm text-gray-600">Quantity</span>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              type="button"
              className="px-3 py-1 text-lg"
              onClick={decQty}
            >
              −
            </button>
            <span className="px-4 py-1 border-l border-r">{qty}</span>
            <button
              type="button"
              className="px-3 py-1 text-lg"
              onClick={incQty}
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 w-fit"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;