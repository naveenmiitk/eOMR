import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/ThemeToggle";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="w-full">
      <div className="flex items-center justify-between p-[2rem]">
        <div>
          <Link href="/">
            {" "}
            <h1 className="text-xl font-semibold">eOMR</h1>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-[1rem]">
          <ModeToggle />
          <Link href="/sign-in">
            <Button>Sign-In</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
