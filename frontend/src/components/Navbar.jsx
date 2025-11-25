import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 ${
      isActive ? "text-black" : "text-gray-600"
    }`;

  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-5 font-medium px-4">
        <div
          className="text-2xl font-bold tracking-[0.2em] cursor-pointer"
          onClick={() => navigate("/")}
        >
          FOREVER<span className="text-pink-500">.</span>
        </div>

        <ul className="hidden sm:flex gap-6 text-sm">
          <NavLink to="/" className={linkClass}>
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
          </NavLink>
          <NavLink to="/collection" className={linkClass}>
            <p>COLLECTION</p>
          </NavLink>
          
        </ul>

        <div className="flex items-center gap-4 text-sm">
         
          <button onClick={() => navigate("/cart")} className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;