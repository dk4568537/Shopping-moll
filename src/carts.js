import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCartItems,
  removeFromCart,
  updateCartItems,
} from "./component/redux/cartSystem";
import { VscAdd, VscChromeMinimize } from "react-icons/vsc";

const Carts = () => {
  const carts = useSelector((state) => state.user.carts);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrement = (productId) => {
    const newCarts = [...carts];
    const index = newCarts.findIndex((a) => a?.product?.id === productId);
    newCarts[index] = {
      ...newCarts[index],
      quantity: newCarts[index].quantity + 1,
    };
    dispatch(updateCartItems(newCarts));
  };

  const handleDecrement = (productId) => {
    const newCarts = [...carts];
    const index = newCarts.findIndex((a) => a?.product?.id === productId);
    if (newCarts[index].quantity > 1) {
      newCarts[index] = {
        ...newCarts[index],
        quantity: newCarts[index].quantity - 1,
      };
      dispatch(clearCartItems(newCarts));
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flow-root">
          {carts && carts.length > 0 ? (
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {carts.slice(0, 4).map(({ product, quantity = 1 }) => (
                <li key={product?.id} className="flex py-6">
                  <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product?.image}
                      className="h-28 w-28 object-center"
                      alt={product?.title}
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a className="multiline-ellipsis h-5">
                            {product?.title}
                          </a>
                        </h3>
                        <p className="ml-4">${product?.price}</p>
                      </div>
                      <p className="mt-1 text-sm multiline-ellipsis h-[40px] text-gray-500">
                        {product?.description}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 flex gap-3">
                        Quantity
                        <button
                          onClick={() => handleDecrement(product?.id)}
                          className="bg-slate-100 hover:bg-slate-400 hover:text-white border p-0.5 text-xl"
                        >
                          <VscChromeMinimize />
                        </button>
                        {quantity}
                        <button
                          onClick={() => handleIncrement(product?.id)}
                          className="bg-slate-100 hover:bg-slate-400 hover:text-white border text-xl p-0.5"
                        >
                          <VscAdd />
                        </button>
                      </p>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => handleRemoveFromCart(product?.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className=" text-xl font-bold">Your cart is empty : </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Carts;
