import React, { useState, useEffect, useRef } from "react";
import Navbar from "../navbar/Navbar";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import "./Men.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Addcart } from "../redux/cartSystem";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const params = useParams();
  const productId = params.productId;
  console.log("useparams hook", { productId });

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}products`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="bg-[#eeeeee]">
      <Navbar />
      <div className="flex justify-end items-center gap-1 py-5 pr-5">
        <div className="text-xl md:text-xl font-semibold">
          <h1>Sort by:</h1>
        </div>
        <div>
          <Menu
            as="div"
            className="relative inline-block text-left"
            ref={dropdownRef}
          >
            <div>
              <Menu.Button
                className="inline-flex md:min-w-full justify-between gap-x-0.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={toggleDropdown}
              >
                Select an option
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              show={dropdownVisible}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/Women"
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block px-4 py-2 text-md`}
                      >
                        (Price)Highest To Lowest
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/Men"
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block px-4 py-2 text-md`}
                      >
                        (Price)Lowest To Highest
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-5">
        <div className="px-5 col-span-1 row-span-2">
          <h1 className=" border-b pb-1 border-slate-700 text-2xl">Category</h1>
          <div className="flex justify-center flex-col gap-3 text-2xl pt-5">
            <span>
              <input
                type="checkbox"
                id="category-men"
                name="/Men"
                onChange={() => handleCategoryChange("men")}
              />
              <label className="p-3" htmlFor="category-men">
                Men
              </label>
            </span>
            <span>
              <input
                type="checkbox"
                id="category-women"
                name="/Women"
                onChange={() => handleCategoryChange("women")}
              />
              <label className="p-3 " htmlFor="category-women">
                Women
              </label>
            </span>
          </div>
        </div>
        {filteredProducts.slice(0, 4).map((product) => (
          <div
            key={product?.id}
            className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-center">
              <Link to={`/product/${product.id}`}>
                <img
                  className=" px-10 py-8  hover:-translate-y-2 h-[225px] rounded-t-lg"
                  src={product?.image}
                  alt="product image"
                />
              </Link>
            </div>
            <div className="px-5 pb-5">
              <a href="#">
                <h2 className="text-xl truncate font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product?.title}
                </h2>
              </a>
              <div className="">
                <p className="py-2 multiline-ellipsis h-[85px] mb-2">
                  {product?.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    dispatch(Addcart({product,quantity:1}));
                  }}
                  className="text-white bg-black inline-grid hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-xs px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${product?.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;
