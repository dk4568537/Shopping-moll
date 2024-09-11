import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Addcart } from "../redux/cartSystem";

const Exploreall = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();

  const params = useParams();
  const productId = params.productId;
  console.log("useparams hook", { productId });

  useEffect(() => {
    const apiUrl =  `${process.env.REACT_APP_API_URL}products`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#eeeeee] mx-auto px-4">
        <div className="flex justify-end gap-1 py-5">
          <div>
            <h1 className="font-sans font-semibold text-2xl">Sort by:</h1>
          </div>
          <div>
            <Menu
              as="div"
              ref={dropdownRef}
              className="relative inline-block text-left"
            >
              <div>
                <Menu.Button
                  onClick={toggleDropdown}
                  className="inline-flex md:min-w-80 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  select an option
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
                </Menu.Button>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/Men"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-md`}
                        >
                          (Price) Highest to Lowest
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/Women"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-md`}
                        >
                          (Price) Lowest to Highest
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <div className="col-span-1 row-span-10">
            <h1 className="border-b border-b-slate-700 text-2xl pb-1">
              Category
            </h1>
            <div className="flex justify-start flex-col gap-1 mt-2">
              <Link
                to="/Men"
                className={`px-4 py-2 border bg-white rounded mr-2 ${
                  selectedCategory === "men" && "bg-blue-500 text-white"
                }`}
                onClick={() => handleCategoryChange("men")}
              >
                Men
              </Link>
              <Link
                to="/women"
                className={`px-4 py-2 border bg-white rounded mr-2 ${
                  selectedCategory === "women" && "bg-blue-500 text-white"
                }`}
                onClick={() => handleCategoryChange("women")}
              >
                Women
              </Link>
            </div>
          </div>
          {filteredProducts.map((product) => (
            <div
              key={product?.id}
              className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-center">
                <Link to={`/product/${product.id}`}>
                  <img
                    className="px-10 py-8 hover:translate-y-2 max-w-[250px] sm:h-[250px] h-[250px] "
                    src={product?.image}
                    alt="product image"
                  />
                </Link>
              </div>
              <div className="px-5 pb-5">
                <a href="#">
                  <h2 className="text-xl truncate font-semibold tracking-tight bg-white text-gray-900 dark:text-white">
                    {product?.title}
                  </h2>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <a>
                      <p className="py-2 h-[80px] w-[240px] sm:w-[210px] md:w-[215px] xl:w-[250px] pr-1 mb-2 multiline-ellipsis">
                        {product?.description}
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => dispatch(Addcart({product,quantity:1}))}
                    href="#"
                    className="text-white bg-black hover:bg-gray-900 focus:ring-2 focus:outline-none focus:bg-gray-800 font-medium  rounded-lg text-xs  px-3 py-2 text-center dark:bg-gray-700 ring-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                  >
                    Add to cart
                  </button>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product?.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exploreall;
