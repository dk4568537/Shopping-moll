import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Product = () => {
  const [products, setProducts] = useState([]);

  const params = useParams();
  const productId = parseInt(params.id);
  console.log(params);

  useEffect(() => {
    const apiUrl =`${process.env.REACT_APP_API_URL}products/${productId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#eeeeee] flex justify-center items-center md:px-8 ">
        <div className=" grid grid-cols-1 md:grid-cols-2 items-center h-screen container gap-8 ">
          <div className=" bg-white flex justify-center items-center rounded-3xl h-96">
            <img
              className=" w-48 sm:w-[200px] md:w-[350px] md:h-80 px-2"
              src={products.image}
              alt={products.title}
            />
          </div>
          <div className=" px-3 flex justify-center items-start flex-col gap-4 pb-5 bg-[#eeeeee]">
            <h1 className=" text-lg md:text-4xl font-bold text-gray-900 dark:text-white md:w-[95%]">
              {products.title}
            </h1>
            <p className=" text-black font-bold text-lg">
              Price: ${products.price}
            </p>
            <p className=" w-[95%]">{products.description}</p>

            <button className=" border bg-black hover:bg-gray-800 hover:ring-2 ring-black text-white px-5 md:px-16 mt-5 py-2.5 md:py-3 rounded-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
