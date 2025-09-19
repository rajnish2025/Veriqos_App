import React from "react";
import DashBoard from "../pages/Dashboard";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import ApiDocs from "../pages/ApiDocs";
import Support from "../pages/Support";
import DocSubscribe from "../pages/DocSubscribe";
import DevTestApi from "../pages/DevTestApi";
import Home from "../pages/Home";
import DevDocs from "../pages/DevDocs";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "@/pages/PageNotFound";
import DocumentationPage from "@/pages/DocumentationPage";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route
          path="/sandbox"
          element={
            <>
              <ProtectedRoutes>
                <Navbar />
                <DashBoard />
              </ProtectedRoutes>
            </>
          }
        />
        <Route
          path="/sandbox/:catId/:id"
          element={
            <>
              <ProtectedRoutes>
                <Navbar />
                <DashBoard />
              </ProtectedRoutes>
            </>
          }
        />
        <Route
          path="/docs"
          element={
            localStorage.getItem("email") ? (
              <>
                {/* <Navbar /> */}
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
              <ProtectedRoutes>
                <Navbar />
                <DevDocs />{" "}
              </ProtectedRoutes>
            </>
          }
        />
        <Route
          path="/devdocs/:id"
          element={
            <>
              <ProtectedRoutes>
                <Navbar />
                <DocumentationPage />{" "}
              </ProtectedRoutes>
            </>
          }
        />
        <Route
          path="/support"
          element={
            <>
              <ProtectedRoutes>
                <Navbar />
                <Support />
              </ProtectedRoutes>
            </>
          }
        />
        <Route
          path="/devApi/test/:catId/:id"
          element={
            <>
              <ProtectedRoutes>
                <Navbar />
                <DevTestApi />
              </ProtectedRoutes>
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <ProtectedRoutes>
                <Navbar />
                <Home />
              </ProtectedRoutes>
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PageNotFound />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Routing;
