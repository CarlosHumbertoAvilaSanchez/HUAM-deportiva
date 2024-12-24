"use client";
import { Input } from "@/components/Input";
import { signInAction } from "@/app/actions";
import Button from "@/components/Button";

export default function LoginForm() {
  return (
    <form className="space-y-4" action={signInAction}>
      <div>
        <Input
          type="email"
          placeholder="Email"
          className="w-full"
          name="email"
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          className="w-full"
          name="password"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#60CCD3] hover:bg-[#43B0B7] text-[#043364] font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        Log In
      </Button>
    </form>
  );
}
