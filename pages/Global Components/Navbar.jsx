import React, { useState, useContext } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import CartContext from "@/store/cart-context";
import Link from "next/link";
const Navbar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartState, setCartState] = useState(false);
  const cartCtx = useContext(CartContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const cartStateHandler = () => {
    cartCtx.cartStateHandler(true);
  };

  return (
    <>
      <nav className="bg-white text-black fixed w-full top-0 left-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-black ">LOGO</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <button
                  className="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleDropdown}
                >
                  <span className="font-medium">Categories</span>
                  <ChevronDown className="ml-2 h-5 w-5" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-4 w-[35rem] bg-white rounded-md shadow-lg py-4 grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <h3 className="px-4 py-2 font-medium text-lg">
                        Electronics
                      </h3>
                      <Link
                        href="/category/laptops"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Laptops
                      </Link>
                      <Link
                        href="/category/smartphones"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Smartphones
                      </Link>
                      <Link
                        href="/category/tablets"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Tablets
                      </Link>
                      <Link
                        href="/category/tvs"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        TVs
                      </Link>
                    </div>
                    <div className="col-span-1">
                      <h3 className="px-4 py-2 font-medium text-lg">Apparel</h3>
                      <Link
                        href="/category/mens-fashion"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Mens Fashion
                      </Link>
                      <Link
                        href="/category/womens-fashion"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Womens Fashion
                      </Link>
                      <Link
                        href="/category/accessories"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Accessories
                      </Link>
                      <Link
                        href="/category/shoes"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Shoes
                      </Link>
                    </div>
                    <div className="col-span-1">
                      <h3 className="px-4 py-2 font-medium text-lg">
                        Home & Kitchen
                      </h3>
                      <Link
                        href="/category/furniture"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Furniture
                      </Link>
                      <Link
                        href="/category/home-decor"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Home Decor
                      </Link>
                      <Link
                        href="/category/kitchen-appliances"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Kitchen Appliances
                      </Link>
                      <Link
                        href="/category/home-improvement"
                        className="block px-4 py-2 hover:bg-gray-200 transition duration-150 ease-in-out"
                      >
                        Home Improvement
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/shop"
                className="px-4 py-2 rounded-md hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 rounded-md hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-md hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center">
              <button
                className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium mr-4 hover:from-purple-500 hover:to-pink-700 transition duration-150 ease-in-out"
                onClick={cartStateHandler}
              >
                <ShoppingCart className="inline-block mr-1" size={16} />
                Cart {cartCtx.cartValue}
              </button>
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
                aria-expanded={isSidebarOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isSidebarOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <ul className="mt-8 space-y-4">
            <li>
              <Link
                href="/category/laptops"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                href="/category/smartphones"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Smartphones
              </Link>
            </li>
            <li>
              <Link
                href="/category/tablets"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Tablets
              </Link>
            </li>
            <li>
              <Link
                href="/category/tvs"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                TVs
              </Link>
            </li>
            <li>
              <Link
                href="/category/mens-fashion"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Mens Fashion
              </Link>
            </li>
            <li>
              <Link
                href="/category/womens-fashion"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Womens Fashion
              </Link>
            </li>
            <li>
              <Link
                href="/category/accessories"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                href="/category/shoes"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                href="/category/furniture"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Furniture
              </Link>
            </li>
            <li>
              <Link
                href="/category/home-decor"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Home Decor
              </Link>
            </li>
            <li>
              <Link
                href="/category/kitchen-appliances"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Kitchen Appliances
              </Link>
            </li>
            <li>
              <Link
                href="/category/home-improvement"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Home Improvement
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 transition duration-150 ease-in-out"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
