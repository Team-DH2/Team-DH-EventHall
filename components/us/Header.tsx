"use client";
import React from "react";
import { ButtonOfNav } from "./ButtonOfNav";
import { Input } from "../ui/input";
import {
  Search,
  X,
  Home,
  Building,
  Music,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { Logo } from "./Logo";
import { BottomNavButton } from "./BottomNavButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isPhoneSearchOpen, setIsPhoneSearchOpen] = React.useState(false);
  const router = useRouter();
  return (
    <>
      {/* ---------------- DESKTOP HEADER ---------------- */}
      <div className="hidden lg:flex text-white w-full h-20 items-center justify-between bg-black/50 backdrop-blur-sm px-10">
        {/* Left Side */}
        <div className="flex-1 flex justify-start">
          <Logo />
        </div>

        {/* Centered Navigation */}
        <div className="flex items-center gap-4 font-bold">
          <Link href="/home">
            <ButtonOfNav text="Home" />
          </Link>

          <Link href="/eventhalls">
            <ButtonOfNav text="Event Halls" />
          </Link>

          <ButtonOfNav text="Performers" />
          <ButtonOfNav text="Hosts" />
          <ButtonOfNav text="Dashboard" />
          <ButtonOfNav text="Contact" />
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="flex items-center w-full max-w-[220px]">
            <Search className="mr-[-36] w-5 z-10 text-neutral-500" />
            <Input
              placeholder="Search..."
              className="pl-10 h-10 rounded-[20px] bg-neutral-800 border-none w-full text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-transparent rounded-md h-10 px-4 text-sm">
              LogIn
            </button>
            <button className="bg-blue-600 rounded-md px-4 h-10 text-sm">
              SignUp
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE/TABLET HEADER ---------------- */}
      <div className="flex lg:hidden text-white w-full h-16 items-center px-4 bg-black/50 ">
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
                className="w-full pl-10 h-9 rounded-[20px] bg-neutral-800 border-none text-white text-sm"
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
            <button className="bg-transparent rounded-md h-9 px-3 text-xs">
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
      <div className="fixed bottom-0 left-0 right-0 lg:hidden flex justify-around items-center h-16 bg-black/50 border-t border-neutral-800 z-50">
        <BottomNavButton
          href="/"
          label="Home"
          icon={<Home className="w-5 h-5" />}
        />
        <BottomNavButton
          href="/event-halls"
          label="Halls"
          icon={<Building className="w-5 h-5" />}
        />
        <BottomNavButton
          href="/performers"
          label="Performers"
          icon={<Music className="w-5 h-5" />}
        />
        <BottomNavButton
          href="/hosts"
          label="Hosts"
          icon={<Users className="w-5 h-5" />}
        />
        <BottomNavButton
          href="/dashboard"
          label="Dashboard"
          icon={<LayoutDashboard className="w-5 h-5" />}
        />
      </div>
    </>
  );
};
