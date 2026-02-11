import logo from "../../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-slate-900 w-full pt-12 pb-52">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12 justify-center">
        <div className="max-w-5xl flex justify-between">
          <div className="max-w-96 w-full space-y-4">
            <div className="flex space-x-2 items-center">
              <img src={logo} alt="Bulldog Barket Logo" width={24} height={24} />
              <span className="text-lg font-bold text-white">Bulldog Barket</span>
            </div>
            <p className="text-gray-200">
              A project for Information Assurance and Security. Dedicated to providing a safe space
              for National University students to trade.
            </p>
          </div>

          <div className="flex space-x-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-200">
                {["Market Feed", "My Account", "Safety Guidelines"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-dark-subtle hover:text-dark-text transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-200">
                {["Market Feed", "My Account", "Safety Guidelines"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-dark-subtle hover:text-dark-text transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="h-0.5 w-full bg-gray-500 rounded-full" />

        <p className="text-white text-center">
          © {new Date().getFullYear()} Bulldog Barket. Not officially affiliated with National
          University administration.
        </p>
      </div>
    </footer>
  );
}
