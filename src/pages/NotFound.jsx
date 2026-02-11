import { Link } from "react-router-dom";
import notFoundBulldog from "../assets/notFoundBulldog.svg";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <img src={notFoundBulldog} alt="not found bulldog" className="h-30 w-30" />

      <h1 className="mb-2 text-6xl font-extrabold text-nu-blue">404</h1>
      <h2 className="mb-4 text-2xl font-bold text-gray-800 ">You're barking up the wrong tree!</h2>
      <p className="mb-8 max-w-md text-gray-600">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="rounded-xl bg-[#35408E] px-6 py-3 font-bold text-white shadow-md transition bg-brand-primary hover:bg-brand-accent hover:text-brand-primary"
        >
          Return Home
        </Link>
        <Link
          to="/marketfeed"
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
        >
          Browse Market
        </Link>
      </div>
    </div>
  );
}
