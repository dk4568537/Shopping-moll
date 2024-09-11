import React from "react";

const Experience = () => {
  return (
   <div className="flex justify-center items-center h-screen px-3 bg-[#eeeeee]">
     <div className="grid grid-cols-1 md:grid-cols-2 container">
      <div className=" flex justify-center items-start flex-col">
        <h1 className=" w-full h-x-full max-h-full text-xl md:text-3xl font-sans font-black uppercase mb-2 md:mb-4">
          Experience the height of fashion with our exquisite designer pieces.
        </h1>
        <p className=" w-full mt-2 md:text-xl font-medium ">
          Where style, sophistication, exclusivity is the forefront of our
          collection. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellat quaerat nostrum quia nam earum, libero, expedita impedit
          delectus provident quo eveniet.
        </p>
        <a
          href="/Exploreall"
          className="hover:ring-2 ring-black mt-4 md:mt-7 md:text-lg font-srmibold cursor-pointer px-3 hover:bg-slate-900 md:px-5 bg-black text-white rounded-lg py-2 border"
        >
          Discover Our Products
        </a>
      </div>
      <div className="grid grid-rows-1 grid-flow-col gap-4">
        <div class="row-span-1 col-span-1 flex justify-center items-center">
          <img
            className=" grayscale hover:grayscale-0 w-1/2 rounded-t-full rounded-b-full"
            src="/images/home-photo-1.webp"
            alt=""
          />
        </div>
        <div class="row-span-2 col-span-1 flex justify-center items-center">
          <img
            className="  grayscale hover:grayscale-0 w-1/2 rounded-b-full"
            src="/images/home-photo-2.webp"
            alt=""
          />
        </div>
        <div class="row-span-4 flex justify-start  items-center hover:image-slate-900">
          <img
            className=" grayscale hover:grayscale-0 rounded-t-full"
            src="images/home-photo-3.webp"
            alt=""
          />
        </div>
      </div>
    </div>
   </div>
  );
};

export default Experience;
