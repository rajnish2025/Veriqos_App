"use client";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, Edit, Book, LifeBuoy, Home, BookOpenText } from "lucide-react";
import veriqosLogo from "../assets/veriqos.png";

const Navbar = () => {
  const [production, setProduction] = useState(
    localStorage.getItem("production") !== null
      ? localStorage.getItem("production") === "false"
        ? false
        : true
      : false
  );
  const location = useLocation();
  const [currentHeading, setCurrentHeading] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("production");
    if (stored !== null) {
      setProduction(stored === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("production", production.toString());
  }, [production]);

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentHeading("DashBoard");
    } else if (location.pathname.match("/sandbox")) {
      setCurrentHeading("SandBox");
    } else if (location.pathname === "/support") {
      setCurrentHeading("Support");
    } else if (location.pathname.match("/devApi/test")) {
      setCurrentHeading("Test");
    }
  }, [location.pathname]);

  const linkClasses = (path) =>
    `flex items-center gap-1 transition ${
      location.pathname === path
        ? "border-b-1 border-white font-semibold"
        : "hover:underline"
    }`;

  return (
    <div className="fixed w-full z-30 top-0">
      <nav className="bg-gradient-to-r from-[#034487] to-[#05C1AD] shadow-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={veriqosLogo}
            alt="Veriqos"
            className="h-9 w-9 animate-spin-slow"
          />
          <span className="text-white text-2xl font-bold tracking-wide">
            Veriqos
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-white font-medium">
          <div className="flex items-center space-x-2">
            <Switch
              id="production-mode"
              checked={production}
              onCheckedChange={setProduction}
              className="data-[state=unchecked]:bg-[#02817f] data-[state=checked]:bg-[#004D8A]"
            />
            <span>Production {production ? "On" : "Off"}</span>
          </div>

          <Link to="/" className={linkClasses("/")}>
            <Home size={16} /> Home
          </Link>
          <Link to="/sandbox" className={linkClasses("/sandbox")}>
            <Edit size={16} /> Sandbox
          </Link>
          <Link
            to="/veriqos/api/docs"
            className={linkClasses("/veriqos/api/docs")}
          >
            <Book size={16} /> Docs
          </Link>
          <Link to="/devdocs" className={linkClasses("/devdocs")}>
            <BookOpenText size={18} /> DevDocs
          </Link>
          <Link to="/support" className={linkClasses("/support")}>
            <LifeBuoy size={16} /> Support
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={26} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gradient-to-b from-[#034487] to-[#05C1AD] text-white p-10"
            >
              <div className="flex flex-col gap-6 mt-6 text-lg font-medium">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="production-mode-mobile"
                    checked={production}
                    onCheckedChange={setProduction}
                    className="data-[state=unchecked]:bg-[#02817f] data-[state=checked]:bg-[#004D8A]"
                  />
                  <span>Production {production ? "On" : "Off"}</span>
                </div>
                <SheetClose asChild>
                  <Link to="/" className={linkClasses("/")}>
                    <Home size={18} /> Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/sandbox" className={linkClasses("/sandbox")}>
                    <Edit size={18} /> Sandbox
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/veriqos/api/docs"
                    className={linkClasses("/veriqos/api/docs")}
                  >
                    <Book size={18} /> Docs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/devdocs"
                    className={linkClasses("/veriqos/devdocs")}
                  >
                    <BookOpenText size={18} />
                    DevDocs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/support" className={linkClasses("/support")}>
                    <LifeBuoy size={18} /> Support
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {location.pathname !== "/veriqos/api/docs" &&
        location.pathname !== "/devdocs" && (
          <header className="bg-gradient-to-r from-[#034487] to-[#05C1AD] text-white py-6 shadow-lg mt-[1px]">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Veriqos API {currentHeading}
              </h1>
              <span className="text-sm md:text-base opacity-90">
                Powering Smart Data • Fast • Secure
              </span>
            </div>
          </header>
        )}
    </div>
  );
};

export default Navbar;
