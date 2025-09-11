import React, { useEffect, useState } from "react";
import veriqosLogo from "../assets/veriqos.png";
import { Link, useLocation } from "react-router-dom";
import { EditIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [production, setProduction] = useState(false);
  localStorage.setItem("production", production);
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("production");
    if (stored !== null) {
      setProduction(stored === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("production", production.toString());
  }, [production]);
  return (
    <>
      <nav className="bg-gradient-to-r from-[#034487] to-[#05C1AD] shadow-md px-6 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <img
            src={veriqosLogo}
            alt="React"
            className="h-8 w-8 animate-spin-slow"
          />
          <span className="text-white text-xl font-bold tracking-wide">
            Veriqos
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center space-x-2 gap-2 justify-center">
            <Switch
              id="airplane-mode"
              className="data-[state=unchecked]:bg-[#02817f] data-[state=checked]:bg-[#004D8A] "
              checked={production}
              onCheckedChange={setProduction}
            />
            Production {production ? "On" : "Off"}
          </div>
          <Link
            to="/"
            className="hover:underline inline-flex items-center gap-1"
            state={production}
          >
            Home
          </Link>
          <Link
            to="/sandbox"
            className="hover:underline inline-flex items-center gap-1"
          >
            Sandbox
            <EditIcon className="size-4" />{" "}
          </Link>
          <Link to="/veriqos/api/docs" className="hover:underline">
            Docs
          </Link>
          {/* <Link to="/devdocs" className="hover:underline">
            DevDocs
          </Link> */}
          <Link to="/support" className="hover:underline">
            Support
          </Link>
        </div>
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#034487] to-[#05C1AD] px-6 py-3 flex flex-col gap-3 shadow-md">
          <Link
            to="/"
            className="text-white hover:text-blue-200 font-medium transition"
          >
            {" "}
            Home
          </Link>
          <Link
            to="/sandbox"
            className="text-white hover:text-blue-200 font-medium transition"
          >
            Sandbox
            <EditIcon className="size-4" />
          </Link>
          <Link
            to="/veriqos/api/docs"
            className="text-white hover:text-blue-200 font-medium transition"
          >
            Docs
          </Link>
          {/* <Link
            to="/devdocs"
            className="text-white hover:text-blue-200 font-medium transition"
          >
            DevDocs
          </Link> */}
          <Link
            to="/support"
            className="text-white hover:text-blue-200 font-medium transition"
          >
            Support
          </Link>
        </div>
      )}
      <header
        className={`bg-gradient-to-r from-[#034487] to-[#05C1AD] text-white py-6 shadow-lg border-t-1 ${
          location.pathname === "/veriqos/api/docs" ? "hidden" : ""
        } `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Veriqos API Hub
          </h1>
          <span className="text-sm md:text-base opacity-90">
            Powering Smart Data • Fast • Secure
          </span>
        </div>
      </header>
    </>
  );
};

export default Navbar;
