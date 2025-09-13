import { useState } from "react";
import "./App.css";
import DashBoard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ApisList from "./pages/ApisList";
import { Route, Routes } from "react-router-dom";
import ApiDocs from "./pages/ApiDocs";
import Support from "./pages/Support";
import DocSubscribe from "./pages/DocSubscribe";
import DevTestApi from "./pages/DevTestApi";
import Home from "./pages/Home";
import DevDocs from "./pages/DevDocs";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sandbox"
          element={
            <>
              <Navbar />
              <DashBoard />
            </>
          }
        />
        <Route
          path="/sandbox/:catId/:id"
          element={
            <>
              <Navbar />
              <DashBoard />
            </>
          }
        />
        <Route
          path="/veriqos/api/docs"
          element={
            localStorage.getItem("email") ? (
              <>
                <Navbar />
                <ApiDocs />{" "}
              </>
            ) : (
              <DocSubscribe />
            )
          }
        />
        <Route
          path="/devdocs"
          element={
            <>
              <Navbar />
              <DevDocs />{" "}
            </>
          }
        />
        <Route
          path="/support"
          element={
            <>
              <Navbar />
              <Support />
            </>
          }
        />
        <Route
          path="/devApi/test/:catId/:id"
          element={
            <>
              <Navbar />
              <DevTestApi />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
