import React from "react";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();

  if (!cartItems.length) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map(({ product, qty }) => {
          const imageSrc = product.image || product.images?.main; // 👈 key line

          return (
            <div
              key={product._id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    ${product.price} × {qty}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(product._id)}
                className="text-sm underline"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">Total: ${cartTotal}</p>
        <button
          onClick={clearCart}
          className="border border-black px-4 py-2 text-sm"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;