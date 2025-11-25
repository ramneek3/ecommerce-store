import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto py-10 px-4 grid gap-8 md:grid-cols-3 text-sm text-gray-700">
        <div>
          <h2 className="text-2xl font-bold tracking-[0.2em]">FOREVER.</h2>
          
        </div>
        <div>
          <h3 className="font-semibold mb-3">COMPANY</h3>
          <p>Home</p>
          <p>Delivery</p>
          <p>Privacy policy</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">GET IN TOUCH</h3>
          <p>+91 8199828888</p>
          <p>ramneek@gmail.com</p>
          
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} FOREVER. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;