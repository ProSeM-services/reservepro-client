import React from "react";
import LoginForm from "../components/login-form";
import Link from "next/link";
import { BackgroundMark } from "../components/BackgroundMark";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]  h-screen bg-background ">
      <div className="flex items-center justify-center py-12  h-full ">
        <div className="  lg:hidden  -z-0 ">
          <BackgroundMark />
        </div>
        <div className="mx-auto grid md:w-[450px] max-md:w-5/6  gap-6 z-10">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden  lg:block relative ">
        <BackgroundMark />
      </div>
    </div>
  );
}
