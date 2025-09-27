"use client";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import veriqosLogo from "../assets/veriqos.png";
import { Menu, HelpCircle, Home, Edit, Book, BookOpenText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    if (stored !== null) setProduction(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("production", production.toString());
  }, [production]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setCurrentHeading("Dashboard");
    else if (path.includes("/sandbox")) setCurrentHeading("Sandbox");
    else if (path === "/support") setCurrentHeading("Support");
    else if (path.includes("/devApi/test")) setCurrentHeading("Test");
    else if (path.includes("/devdocs")) setCurrentHeading("Documentation");
    else setCurrentHeading("");
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={16} /> },
    { to: "/sandbox", label: "Sandbox", icon: <Edit size={16} /> },
    { to: "/docs", label: "Docs", icon: <Book size={16} /> },
    { to: "/devdocs", label: "DevDocs", icon: <BookOpenText size={16} /> },
    // { to: "/support", label: "Support", icon: <LifeBuoy size={16} /> },
  ];

  const linkClasses = (path) =>
    `flex items-center gap-1 transition ${
      location.pathname === path
        ? "border-b-2 border-white font-semibold"
        : "hover:underline"
    }`;

  return (
    <div className="fixed top-0 w-full z-30">
      <nav className="bg-gradient-to-r from-[#034487] to-[#05C1AD] shadow-md px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 w-[50%] justify-between md:justify-start">
            <img
              src={veriqosLogo}
              alt="Veriqos"
              className="h-9 w-9 animate-spin-slow"
            />
            <span className="text-white text-2xl font-bold tracking-wide">
              Veriqos
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white font-medium justify-items-start">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={linkClasses(link.to)}>
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <HelpCircle size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Help Center</DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/support">Contact Support</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Send Feedback</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className=" hidden md:flex items-center space-x-2 text-white font-medium">
            <Switch
              id="production-mode"
              checked={production}
              onCheckedChange={setProduction}
              className="data-[state=unchecked]:bg-[#02817f] data-[state=checked]:bg-[#004D8A]"
            />
            <span>Production {production ? "On" : "Off"}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-white">
                <AvatarImage src="/images/bonnie.png" alt="Bonnie Green" />
                <AvatarFallback>BG</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">Rajnish Singh</span>
                  <span className="text-sm text-muted-foreground">
                    rajnish@veriqos.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Api Key</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu size={26} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gradient-to-b from-[#034487] to-[#05C1AD] text-white p-8"
              >
                <div className="mb-6 flex items-center gap-4">
                  <Avatar className="h-10 w-10 ring-2 ring-white">
                    <AvatarImage src="/images/bonnie.png" alt="Bonnie Green" />
                    <AvatarFallback>BG</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block font-semibold">Bonnie Green</span>
                    <span className="text-sm text-white/70">
                      name@flowbite.com
                    </span>
                  </div>
                </div>
                <div className="mb-6 flex items-center space-x-2">
                  <Switch
                    checked={production}
                    onCheckedChange={setProduction}
                    className="data-[state=unchecked]:bg-[#02817f] data-[state=checked]:bg-[#004D8A]"
                  />
                  <span>Production {production ? "On" : "Off"}</span>
                </div>
                <div className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <Link to={link.to} className={linkClasses(link.to)}>
                        {link.icon} {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      {location.pathname !== "/docs" && location.pathname !== "/devdocs" && (
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
