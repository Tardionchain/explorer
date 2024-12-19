"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <b className="text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300 py-8">
              Tardionchain
            </b>
          </Link>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/about"
                  className="text-white hover:text-stone-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="https://docs.tardionchain.xyz/"
                  className="text-white hover:text-stone-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Docs
                </Link>
                <Link
                  href="/research"
                  className="text-white hover:text-stone-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Research
                </Link>
                <Link
                  href="/tokenomics"
                  className="text-white hover:text-stone-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Tokenomics
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="https://docs.tardionchain.xyz/"
              className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="/research"
              className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Research
            </Link>
            <Link
              href="/about"
              className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/tokenomics"
              className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Tokenomics
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
