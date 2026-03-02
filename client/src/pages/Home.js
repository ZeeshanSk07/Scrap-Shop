import React from "react";

function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Premium Marketplace for <br />
            Vehicles & Genuine Parts
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Buy and sell vehicles with confidence. Verified listings,
            transparent pricing, and a seamless experience.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="/vehicles"
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              Browse Vehicles
            </a>

            <a
              href="/sell"
              className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Sell Your Vehicle
            </a>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">Why Choose Us</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                Every vehicle and part is reviewed before publishing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                Clear pricing with no hidden charges.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">
                Secure Transactions
              </h3>
              <p className="text-gray-600">
                Safe and reliable buying & selling process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">Explore Our Marketplace</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                alt="Vehicles"
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <a
                  href="/vehicles"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
                >
                  View Vehicles
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1200&q=80"
                alt="Car Components"
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <a
                  href="/parts"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
                >
                  View Parts
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-6 text-center">
        © {new Date().getFullYear()} Your Marketplace. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
