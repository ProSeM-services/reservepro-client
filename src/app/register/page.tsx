import React from "react";
import { BackgroundMark } from "../components/BackgroundMark";
import Link from "next/link";
import LoginForm from "../components/login-form";
import RegisterForm from "../components/register-form";

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]  h-screen bg-background ">
      <div className="flex items-center justify-center py-12  h-full  ">
        <div className="  lg:hidden -z-0 ">
          <BackgroundMark opacity={5} />
        </div>
        <div className="mx-auto grid md:w-[600px] max-md:w-5/6 gap-6 z-10 ">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <RegisterForm />

          <div className="mt-4 text-center text-sm">
            Do you have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden  lg:block relative ">
        <BackgroundMark opacity={5} />
      </div>
    </div>
  );
}
