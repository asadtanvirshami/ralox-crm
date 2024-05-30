import React, { Fragment } from "react";

import { useMutation } from "react-query";

import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { PulseLoader } from "react-spinners";
import Cookies from "js-cookie";

import { userSigninRequest } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { unitGetRequest } from "@/api/unit";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    serial: "",
    password: "",
  });

  const loginUser = async (formData) => {
    if (formData.id < 4 || formData.password < 4) {
      return;
    }

    const response = await userSigninRequest(formData);
    const units = await unitGetRequest();

    if (response?.success === true) {
      toast({
        variant: "success",
        title: "Signing In",
        description: "Please wait...",
        duration: 900,
      });

      let jwtToken = jwt_decode(response?.data?.token);
      
      const userCache = {
        id: jwtToken?.id,
        name: jwtToken?.name,
        email: jwtToken?.email,
        designation: jwtToken?.designation,
        unit: jwtToken?.unit,
        depart: jwtToken?.depart,
        createdAt: jwtToken?.createdAt,
        updatedAt: jwtToken?.updatedAt,
        checkedIn: false,
        isAdmin: false,
        lastCheckedIn: null,
      };

      Cookies.set("user", JSON.stringify(userCache), { expires: 1 });
      Cookies.set("unit", JSON.stringify(units?.data?.data), { expires: 1 });
      Cookies.set("token", response?.data?.token, { expires: 1 });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
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
    isSuccess,
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
            <label className="text-sm text-white ml-2">Serial-ID</label>
            <input
              name="serial"
              type="text"
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
                disabled={isSuccess || isLoading ? true : false}
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
