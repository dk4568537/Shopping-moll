import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const navigate = useNavigate();
  const checkout = useSelector((state) => state.user.carts);
  const validationSchema = Yup.object().shape({
    Email: Yup.string().email().required("Please enter your currect Email"),
    FirstName: Yup.string().required("Please enter your First Name"),
    LastName: Yup.string().required("Please enter your Last Name"),
    Address: Yup.string().required("Please enter you Address"),
    City: Yup.string().required("Please enter your City"),
  });

  const setFormValues = (values) => {
    localStorage.setItem("checkoutFormData", JSON.stringify(values));
  };

  return (
    <div className="bg-[#eeeeee]">
      <Navbar />
      <Formik
        initialValues={{
          Email: "",
          FirstName: "",
          LastName: "",
          Address: "",
          City: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (!user) {
            navigate("/login");
          } else {
            localStorage.setItem("checkoutFormData", JSON.stringify(values));
            setSubmittedData(values);
            resetForm();
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="md:pb-20 md:pt-20 px-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="col-span-2 row-auto gap-5">
                <div className="grid grid-cols-1 gap-5">
                  <h1 className="text-xl font-bold">Contact Information</h1>
                  <Field
                    className="p-3 rounded-md"
                    type="text"
                    name="Email"
                    placeholder="Email"
                  />
                  {errors.Email && touched.Email && (
                    <div className="text-red-500">{errors.Email}</div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
                  <h1 className="grid col-span-1 md:col-span-2 md:row-span-2 pt-5 text-xl font-bold">
                    Shipping Address
                  </h1>
                  <Field
                    className="p-3 rounded-md"
                    type="text"
                    name="FirstName"
                    placeholder="First Name"
                  />
                  {errors.FirstName && touched.FirstName && (
                    <div className="text-red-500">{errors.FirstName}</div>
                  )}
                  <Field
                    className="p-3 rounded-md"
                    type="text"
                    name="LastName"
                    placeholder="Last Name"
                  />
                  {errors.LastName && touched.LastName && (
                    <div className="text-red-500">{errors.LastName}</div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <Field
                    className="p-3 rounded-md"
                    type="text"
                    name="Address"
                    placeholder="Address"
                  />
                  {errors.Address && touched.Address && (
                    <div className="text-red-500">{errors.Address}</div>
                  )}
                  <Field
                    className="p-3 rounded-md"
                    type="text"
                    name="City"
                    placeholder="City"
                  />
                  {errors.City && touched.City && (
                    <div className="text-red-500">{errors.City}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 hover:ring-2 ring-black hover:shadow-lg hover:font-semibold mt-5 bg-black hover:bg-gray-900 text-white rounded-md"
                >
                  Checkout
                </button>
              </div>
              <div className="col-span-1 row-span-1 px-3 bg-white rounded-md">
                <h1 className="py-5 border-b font-bold text-center">
                  Order Summary
                </h1>
                {checkout.map(({ product }) => (
                  <div>
                    <h3 className=" flex justify-between gap-x-4">
                      <a className=" font-bold pt-1 font-sans">
                        1* {product.title}
                      </a>
                      <a>${product.price}</a>
                    </h3>
                    <p className=" scroll-auto w-full md:h-72 pt-2">
                      {product.description}
                    </p>
                    <h1 className="border-t flex justify-between pt-1 pb-2">
                      Total
                      <a className=" font-bold">${product.price}</a>
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Display submitted data */}
      {submittedData && (
        <div className="mt-5 p-5 bg-white">
          <h2 className="text-xl font-semibold mb-3">Submitted Data</h2>
          <ul>
            {Object.entries(submittedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Checkout;
