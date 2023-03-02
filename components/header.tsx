import Link from "next/link";

export default function Header() {
  return (
<header className="bg-gray-900 text-white flex shadow lg:px-4 py-4">
      <nav className="w-1/2 flex justify-between items-center mx-auto">
        <div className="flex-1">
          <ul className="flex list-none space-x-14">
            <li>
              <Link href="/" className="text-lg font-bold hover:text-lime-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cryptocurrencies" className="text-lg font-bold hover:text-lime-400">
                Cryptocurrencies
              </Link>
            </li>
            <li>
              <Link href="/alerts" className="text-lg font-bold hover:text-lime-400">
                Whale Alerts
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex list-none items-center">
          <li>
            <input
              type="search"
              className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-300"
              placeholder="Search"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};