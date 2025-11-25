import React from "react";

const Home = () => {
  return (
    <div className="mt-6 space-y-16">
      {/* Hero */}
      <section className="grid md:grid-cols-2 border">
        <div className="p-10 flex flex-col justify-center gap-4">
          <p className="text-xs tracking-[0.25em]">OUR BESTSELLERS</p>
          <h1 className="text-4xl md:text-5xl font-light">
            <span className="font-semibold">Latest</span> Arrivals
          </h1>
          <button className="mt-4 border border-black px-6 py-3 text-sm">
            SHOP NOW
          </button>
        </div>
        <div className="bg-pink-100 flex items-center justify-center">
          {/* placeholder image */}
          <img
            src="https://via.placeholder.com/400x500?text=Hero+Image"
            alt=""
            className="h-full object-cover"
          />
        </div>
      </section>

      {/* Latest Collections */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl tracking-[0.25em]">
          LATEST <span className="font-semibold tracking-normal">COLLECTIONS</span>
        </h2>
       
        {/* You can reuse product cards from Collection page here later */}
      </section>

      {/* Policies */}
      <section className="grid md:grid-cols-3 gap-8 text-center text-sm">
        <div>
          <div className="text-3xl mb-2">🔁</div>
          <p className="font-semibold">Easy Exchange Policy</p>
          <p className="text-gray-500">
            We offer hassle free exchange policy
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">📦</div>
          <p className="font-semibold">7 Days Return Policy</p>
          <p className="text-gray-500">
            We provide 7 days free return policy
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">🎧</div>
          <p className="font-semibold">Best customer support</p>
          <p className="text-gray-500">We provide 24/7 customer support</p>
        </div>
      </section>

      {/* Subscribe */}
      <section className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">Subscribe now & get 20% off</h3>
        
        <div className="flex max-w-md mx-auto border">
          <input
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 outline-none text-sm"
          />
          <button className="bg-black text-white px-5 text-sm">
            SUBSCRIBE
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
