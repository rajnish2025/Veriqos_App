import { useState } from "react";
import "./App.css";
import Routing from "./utilities/Routing";
import { Toaster } from "@/components/ui/sonner";

function App({ children }) {
  return (
    <>
      {children}
      <Toaster position="top-right" />
      <Routing />;
    </>
  );
}

export default App;
