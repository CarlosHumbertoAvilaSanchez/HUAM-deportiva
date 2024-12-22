import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import Button from "@/components/Button";
import { cabin } from "@/app/fonts";

export default async function LoginPage() {
  return (
    <div
      className={`flex min-h-screen bg-gradient-to-br from-[#043364] via-[#60CCD3] to-[#FBCD69] ${cabin.className}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        <div className="hidden md:block w-1/2 p-8">
          <Image
            src="/placeholder.svg?height=400&width=600"
            width={600}
            height={400}
            alt="Sports event"
            className="rounded-xl shadow-2xl"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#043364]">
              Login to SportEvents
            </h2>
            <LoginForm />
            <div className="mt-4 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-[#043364] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-6">
              <p className="text-center text-gray-600 mb-4">Or login with</p>
              <div className="flex justify-center space-x-4">
                <Button className="w-full p-2 flex items-center space-x-2 border-[1px] border-[#043364] text-[#043364] hover:bg-[#043364] hover:text-white transition duration-300">
                  <span>Facebook</span>
                </Button>
                <Button className="w-full p-2 flex items-center space-x-2 border-[1px] border-[#FBCD69] text-[#FBCD69] hover:bg-[#FBCD69] hover:text-[#043364] transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Google</span>
                </Button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#60CCD3] hover:underline font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
