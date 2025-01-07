"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "../Ui/Button";

import { Input } from "../Ui/Input";
import { toast } from "react-toastify";

export default function AuthForm({ type }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Working on integrating ${provider} login`);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          {type === "sign-in"
            ? "Sign in to your account"
            : "Create your account"}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm -space-y-px">
          {type === "sign-up" && (
            <div>
              <Input
                id="name"
                name="name"
                type="text"
                className="block w-full mt-1"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              className="block w-full mt-1"
              placeholder="Email address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              id="password"
              name="password"
              type="password"
              className="block w-full mt-1"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            {type === "sign-in" ? "Sign in" : "Sign up"}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleSocialLogin("Google")}
            icon="flat-color-icons:google"
            className="w-full bg-gray-800 hover:bg-gray-700"
          >
            Google
          </Button>
          <Button
            onClick={() => handleSocialLogin("Facebook")}
            icon="logos:facebook"
            className="w-full bg-gray-800 hover:bg-gray-700"
          >
            Facebook
          </Button>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link
          href={type === "sign-in" ? "/auth/sign-up" : "/auth/sign-in"}
          className="font-medium text-red-600 hover:text-red-500"
        >
          {type === "sign-in"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Link>
      </div>
    </div>
  );
}
