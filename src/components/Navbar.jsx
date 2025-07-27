"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { token, logout, userName } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-green-500 to-blue-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-200">
              <span className="bg-white text-green-600 px-2 py-1 rounded-md mr-1">Medi</span>
              <span>Verse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-4">
              <Link 
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                href="/"
              >
                Home
              </Link>

              {!token ? (
                <>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/about"
                  >
                    About
                  </Link>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/contact"
                  >
                    Contact
                  </Link>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/login"
                  >
                    Login
                  </Link>
                  <Link 
                    className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors duration-200 ml-2 shadow-md" 
                    href="/register"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/symptom-checker"
                  >
                    Symptom Checker
                  </Link>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/diseases"
                  >
                    Disease Info
                  </Link>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/medicines"
                  >
                    Medicine Info
                  </Link>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/chatbot"
                  >
                    Chatbot
                  </Link>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/report-analyzer"
                  >
                    Report Analyzer
                  </Link>
                  <Link 
                    className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200" 
                    href="/genetic-risk"
                  >
                    Genetic Risk
                  </Link>
                  <div className="ml-4 flex items-center">
                    <span className="text-sm font-medium text-white bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full">
                      Hi, {userName}
                    </span>
                    <button
                      onClick={logout}
                      className="ml-3 px-3 py-1 rounded-md text-sm font-medium text-white hover:bg-red-400 hover:bg-opacity-30 transition-colors duration-200 border border-white border-opacity-30"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-400 hover:bg-opacity-30 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-500 to-green-500 bg-opacity-95 pb-3 px-2">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
            >
              Home
            </Link>

            {!token ? (
              <>
                <Link 
                  href="/about" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link 
                  href="/login" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-200 mt-2 shadow-md"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/symptom-checker" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Symptom Checker
                </Link>
                <Link 
                  href="/diseases" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Disease Info
                </Link>
                <Link 
                  href="/medicines" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Medicine Info
                </Link>
                <Link 
                  href="/chatbot" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Chatbot
                </Link>
                <Link 
                  href="/report-analyzer" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Report Analyzer
                </Link>
                <Link 
                  href="/genetic-risk" 
                  onClick={toggleMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-400 hover:bg-opacity-30 transition-colors duration-200"
                >
                  Genetic Risk
                </Link>
                <div className="px-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full">
                      Hi, {userName}
                    </span>
                    <button
                      onClick={() => {
                        toggleMenu();
                        logout();
                      }}
                      className="px-3 py-1 rounded-md text-sm font-medium text-white hover:bg-red-400 hover:bg-opacity-30 transition-colors duration-200 border border-white border-opacity-30"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;