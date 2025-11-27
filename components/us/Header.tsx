"use client";
import React from "react";
import { ButtonOfNav } from "./ButtonOfNav";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { BottomNavButton } from "./BottomNavButton";

export const Header = () => {
  const [isPhoneSearchOpen, setIsPhoneSearchOpen] = React.useState(false);

  return (
    <>
      {/* ---------------- DESKTOP HEADER ---------------- */}
      <div className="hidden lg:flex text-white w-full h-20 items-center justify-between bg-black/50 backdrop-blur-sm">
        <Logo />

        <div className="hidden font-bold w-200 justify-between lg:flex items-center">
          <div className="ml-5">
            <ButtonOfNav text="Home" />
          </div>
          <ButtonOfNav text="Event Halls" />
          <ButtonOfNav text="Performers" />
          <ButtonOfNav text="Hosts" />
          <ButtonOfNav text="Dashboard" />
          <div className="mr-5">
            <ButtonOfNav text="Contact" />
          </div>
        </div>

        <div className="flex mr-10 items-center justify-between w-full lg:w-auto gap-3">
          <div className="flex items-center">
            <Search className="mr-[-36] w-5 z-10 text-neutral-500" />
            <Input
              placeholder="Search..."
              className="pl-10 h-10 rounded-[20px] bg-neutral-800 border-none"
            />
          </div>

          <div className="flex gap-2">
            <button className="bg-black rounded-md h-10 px-4 text-sm">
              LogIn
            </button>
            <button className="bg-blue-600 rounded-md px-4 h-10 text-sm">
              SignUp
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE/TABLET HEADER ---------------- */}
      <div className="flex lg:hidden text-white w-full h-16 items-center px-4 bg-black/50 border-b border-neutral-800">
        {/* LEFT SIDE: Logo OR X Button */}
        {!isPhoneSearchOpen ? (
          <Logo />
        ) : (
          <X
            className="w-6 h-6 text-neutral-300 hover:text-white mr-3"
            onClick={() => setIsPhoneSearchOpen(false)}
          />
        )}

        {/* MIDDLE: Search input (full width when open) */}
        <div className="flex-1 mx-4">
          {isPhoneSearchOpen && (
            <div className="flex items-center">
              <Search className="mr-[-36] w-5 z-10 text-neutral-500" />
              <Input
                placeholder="Search..."
                className="w-full pl-10 h-9 rounded-[20px] bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Search button + Auth (hidden when searching) */}
        {!isPhoneSearchOpen ? (
          <div className="flex items-center gap-3">
            <Search
              className="w-6 h-6 text-neutral-300 hover:text-white"
              onClick={() => setIsPhoneSearchOpen(true)}
            />
            <button className="bg-neutral-900 rounded-md h-9 px-3 text-xs border border-neutral-700">
              LogIn
            </button>
            <button className="bg-blue-600 rounded-md px-3 h-9 text-xs">
              SignUp
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* ---------------- MOBILE/TABLET BOTTOM NAV ---------------- */}
      {/* ---------------- MOBILE/TABLET BOTTOM NAV ---------------- */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden flex justify-around items-center h-16 bg-black border-t border-neutral-800 z-50">
        <BottomNavButton text="Home" />
        <BottomNavButton text="Event Halls" />
        <BottomNavButton text="Performers" />
        <BottomNavButton text="Hosts" />
        <BottomNavButton text="Dashboard" />
        <BottomNavButton text="Contact" />
      </div>
    </>
  );
};
