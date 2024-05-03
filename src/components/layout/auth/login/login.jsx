import React, { Fragment } from "react";

import { useMutation } from "react-query";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";
import Cookies from "js-cookie";

import { userSigninRequest } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const loginUser = async (formData) => {
    if (formData.email < 4 || formData.password < 4) {
      return;
    }

    const response = await userSigninRequest(formData);

    if (response?.success === true) {
      toast({
        variant: "success",
        title: "Signing In",
        description: "Please wait...",
        duration: 900,
      });
      let jwtToken = jwtDecode(response?.data?.token);
      const userCache = {
        id: response?.data?.id,
        id: response?.data?.name,
        id: response?.data?.email,
        id: response?.data?.createdAt,
        id: response?.data?.updatedAt,
      };
      if (response?.data?.token) {
        Cookies.set("user", userCache);
        Cookies.set("token", jwtToken);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } else {
      return undefined;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const {
    mutate: authMutation,
    isLoading,
    isError,
  } = useMutation(loginUser, {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Sign In failed",
        description: "User does not exist.",
        duration: 800,
      });
      console.error("Error loggining user:", error);
    },
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Execute the mutation function with the form data
      await authMutation(formData);
    } catch (error) {
      console.error("Error loggining user:", error);
    }
  };

  return (
    <Fragment>
      <div className="flex h-screen align-middle justify-center items-center bg-gradient-to-r from-sky-500 to-blue-500">
        <div className=" justify-center align-middle">
          <h1 className="text-center font-body mb-14 font-semibold text-5xl text-white">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="w-auto lg:w-96 grid">
            <label className="text-sm text-white ml-2">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => handleChange(e)}
              className=" p-2 rounded-md m-2 outline-none"
            />
            <label className="text-sm text-white ml-2">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => handleChange(e)}
              className=" p-2 rounded-md m-2 outline-none"
            />
            <div className="text-left mb-4 ml-2 mt-5 flex justify-between items-center">
              <button
                type="submit"
                className={`p-[6px] rounded-md bg-theme-700  text-white font-semibold ${
                  isLoading ? "hover:" : "hover:bg-white"
                } hover:text-sky-600 `}
              >
                {isLoading ? <PulseLoader color="white" size={8} /> : "Sign In"}
              </button>
              <small className="text-white text-sm">
                {/* {isError && "user does not exist."} */}
              </small>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(Login);
