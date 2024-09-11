import React, { useState } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSignup = async () => {
    const { username, password, confirmPassword } = signupData;
    console.log("Signup Data:", signupData.email);
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://your-signup-endpoint.com", {
        username,
        password,
      });
      alert("User signed up successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed!");
    }
  };

  const handleLogin = async () => {
    console.log("Login Data:", loginData.email, loginData.password);

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: loginData.email,
        password: loginData.password,
      });
      alert("Login successful!");
      console.log(response.data);
      localStorage.setItem("token", response.data?.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed!");
    }
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <div className="relative md:h-[100vh] w-full flex justify-center items-center flex-col">
        <img
          className="absolute w-full h-screen object-cover"
          src="/images/pentree.jpg"
          alt=""
        />
        <div className="absolute top-12 flex justify-center space-x-8 mt-2 md:pb-8">
          <button
            type="button"
            onClick={handleToggle}
            className={`py-2 px-8 rounded-md ${
              isLogin ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleToggle}
            className={`py-2 px-8 rounded-md ${
              !isLogin ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Signup
          </button>
        </div>
        <div className="absolute top-32 mx-3 mt-5">
          {isLogin ? (
            <div className="max-w-md mx-auto shadow-md rounded-md py-8 p-4">
              <h2 className="text-3xl text-white text-center font-semibold mb-4">
                Login to your account
              </h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <input
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => handleChange(e, setLoginData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => handleChange(e, setLoginData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
                <a
                  href="/Login"
                  className="underline font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
                >
                  Login
                </button>
                <p className="flex justify-center text-white">
                  <span>____________</span>
                  <span className="pt-2 md:pt-1 px-2 text-xs md:text-lg">
                    or continue with
                  </span>
                  <span>____________</span>
                </p>
                <div className="flex justify-center space-x-8 items-center">
                <Link
                   to='https://www.google.com/'
                  >
                  <button
                    className="md:px-14 px-5 py-2 bg-slate-300 hover:text-white hover:bg-blue-500 rounded-md flex items-center gap-2"
                    type="button"
                  >
                    <FaGoogle className="text-red-300" />
                    Google
                  </button>
                  </Link>
                  <Link
                   to='https://github.com/daneshkumar5/learnreact'
                  >
                  <button
                    className="md:px-14 px-5 py-2 bg-slate-300 hover:text-white hover:bg-blue-500 rounded-md flex gap-2 items-center"
                    type="button"
                  >
                    <VscGithubInverted />
                    GitHub
                  </button>
                  </Link>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{" "}
                  <a
                    href="#"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Start a 1-day free trial
                  </a>
                </p>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto shadow-lg rounded-md pb-8 p-4">
              <h2 className="text-xl text-white text-center font-bold pb-5">
                Sign up for a new account
              </h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) => handleChange(e, setSignupData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => handleChange(e, setSignupData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={(e) => handleChange(e, setSignupData)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
                <a
                  href="/Login"
                  className="underline font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
                >
                  Register
                </button>
                <p className="flex justify-center text-white">
                  <span>____________</span>
                  <span className="pt-2 md:pt-1 px-2 text-xs md:text-lg">
                    or continue with
                  </span>
                  <span>____________</span>
                </p>
                <div className="flex justify-center space-x-8 items-center">
                  <Link
                   to='https://www.google.com/'
                  >
                  <button
                    className="md:px-14 px-5 py-2 bg-slate-300 hover:text-white hover:bg-blue-500 rounded-md flex items-center gap-2"
                    type="button"
                  >
                    <FaGoogle className="text-red-300" />
                    Google
                  </button>
                  </Link>
                  <Link to='https://github.com/daneshkumar5/learnreact'>
                  <button
                    className="md:px-14 px-5 py-2 bg-slate-300 hover:text-white hover:bg-blue-500 rounded-md flex gap-2 items-center"
                    type="button"
                  >
                    <VscGithubInverted />
                    GitHub
                  </button>
                  </Link>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                  Already a member?{" "}
                  <a
                    href="#"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    onClick={handleToggle}
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
