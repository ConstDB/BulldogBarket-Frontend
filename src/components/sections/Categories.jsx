import { Book, Hamburger, Shirt, Star } from "lucide-react";

export default function Categories() {
  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-4">
        <div className="space-y-2 mb-12">
          <h1 className="font-bold text-4xl">What can you find?</h1>
          <p className="text-xl text-slate-700">Everything a Nationalian needs.</p>
        </div>

        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`bg-[rgba(53,64,142,0.7)] rounded-lg flex flex-col space-y-2 py-24 justify-center items-center`}
          >
            <Shirt className="size-12" stroke="white" />
            <h3 className="text-xl font-bold text-white">Uniforms</h3>
            <span className="text-sm text-white">Pre-loved and New</span>
          </div>

          <div
            className={`bg-[rgba(234,179,8,0.8)] rounded-lg flex flex-col space-y-2 py-24 justify-center items-center`}
          >
            <Hamburger className="size-12" stroke="white" />
            <h3 className="text-xl font-bold text-white">Food</h3>
            <span className="text-sm text-white">Snacks & Meals</span>
          </div>

          <div
            className={`bg-[rgba(51,65,85,0.9)] rounded-lg flex flex-col space-y-2 py-24 justify-center items-center`}
          >
            <Book className="size-12" stroke="white" />
            <h3 className="text-xl font-bold text-white">Books</h3>
            <span className="text-sm text-white">Reviewers & Notes</span>
          </div>

          <div
            className={`bg-[rgba(79,70,229,0.9)] rounded-lg flex flex-col space-y-2 py-24 justify-center items-center`}
          >
            <Star className="size-12" stroke="white" />
            <h3 className="text-xl font-bold text-white">Merch</h3>
            <span className="text-sm text-white">Fanmade & Official</span>
          </div>
        </div>
      </div>
    </section>
  );
}
