import ThemeButton from "../ThemeButton";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";

const navItems = [
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Safety",
    href: "/safety",
  },
];

export default function Header() {
  return (
    <header className="w-full h-20 bg-brand-primary flex justify-center items-center">
      <div className="max-w-360 w-full flex justify-between">
        <div className="flex items-center space-x-2">
          <IoStorefrontOutline className="text-[#ffd400]" size={32} />
          <span className="text-2xl text-white font-bold">Bulldog Barket</span>
        </div>

        <div className="flex items-center space-x-12">
          <ul className="flex text-white space-x-6">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link to={item.href}>
                  <nav className="font-bold hover:text-brand-accent transition-colors duration-300">
                    {item.title}
                  </nav>
                </Link>
              </li>
            ))}
          </ul>

          <ThemeButton />

          <div className="flex space-x-4">
            <Link to="/signin">
              <button className="bg-transparent border text-white transition-colors hover:text-black border-white font-bold hover:bg-white hover:text-brand-primary py-2 px-5 rounded-xl">
                Sign In
              </button>
            </Link>

            <Link to="/signup">
              <button className="bg-brand-accent text-brand-primary font-bold py-2 px-5 text-[#35408E] rounded-xl border border-transparent">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
