import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  // ---- TOTAL CALCULATION ----
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return <h2 className="p-8 text-center">Your cart is empty 🛒</h2>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-5">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b pb-4"
          >
            {/* Product Image + Info */}
            <div className="flex gap-4 items-center w-1/2">
              <img
                src={item.images?.main || item.image}
                alt={item.name}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-gray-500 text-sm">${item.price}</p>
              </div>
            </div>

            {/* Qty controls */}
            <div className="flex gap-3 items-center">
              <button
                className="px-2 py-1 border rounded"
                onClick={() => decreaseQty(item._id)}
              >
                −
              </button>

              <span className="text-lg">{item.quantity}</span>

              <button
                className="px-2 py-1 border rounded"
                onClick={() => increaseQty(item._id)}
              >
                +
              </button>
            </div>

            {/* Line total */}
            <p className="text-lg font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            {/* Remove */}
            <button
              className="text-red-500 underline"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ---- TOTAL SECTION ---- */}
      <div className="mt-10 flex justify-end">
        <div className="text-right">
          <p className="text-xl font-bold">
            Total: <span className="text-black">${total.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;