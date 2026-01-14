import { ChevronRight, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-[1440px] relative mx-auto my-32">
      <div className="absolute rounded-full top-50 -left-40 size-[600px] bg-brand-accent/30 blur-3xl animate-pulse z-0"></div>
      <div className="absolute rounded-full -top-40 -right-40 size-[600px] bg-brand-primary/30 blur-3xl animate-pulse z-0"></div>

      <div className="flex flex-col justify-center items-center ">
        <div className="rounded-full px-4 bg-blue-100 text-[#2d3678] font-bold border border-blue-200 mb-4">
          Verified Student Marketplace
        </div>

        <h1 className="text-7xl max-w-3xl font-bold text-center">
          <span className="text-gray-900">Buy & Sell within the </span>
          <span className="bg-linear-to-r from-[#2d3678] via-blue-800 to-[#35408E] bg-clip-text text-transparent">
            Bulldog Community
          </span>
        </h1>

        <p className="max-w-3xl mt-5 text-center text-slate-700 text-xl">
          The safest way to trade preloved uniforms, books, food, and merch. Exclusive to verified
          Nationalians. No bogus buyers, just barkada
        </p>

        <div className="flex items-center justify-center space-x-4 mt-10">
          <button className="bg-brand-primary py-4 px-8 rounded-lg flex space-x-2 items-center shadow">
            <span className="text-white font-bold text-xl">Start Selling</span>
            <ChevronRight className="text-white" />
          </button>

          <button className="bg-white border border-gray-200 py-4 px-8 rounded-lg flex space-x-2 items-center shadow">
            <Search />
            <span className="text-gray-800 font-bold text-xl">Browse Items</span>
          </button>
        </div>
      </div>
    </section>
  );
}
