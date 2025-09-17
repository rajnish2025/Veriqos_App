import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { act, useEffect, useState } from "react";
import { FaBook, FaCode, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiJsonData from "../../data.json";

const ApiDocsHero = () => (
  <div className="bg-gradient-to-r from-[#024888] to-[#00BAAB] text-white rounded-xl p-6 mb-5 shadow flex flex-col md:flex-row items-center justify-between">
    <div>
      <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
        <FaBook className="inline-block mb-1" /> Veriqos API Documentation
      </h1>
      <p className="text-lg mb-3 max-w-full">
        Integrate your applications with Veriqos using our secure and robust
        RESTful APIs. Below you'll find comprehensive guides and documentation
        to help you start working with our APIs as quickly as possible.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-5 py-2 bg-white text-[#00819C] font-semibold rounded shadow hover:bg-blue-50 transition"
      >
        <FaLink className="mr-2" /> Jump to Endpoints
      </Link>
    </div>
    <div className="mt-6 md:mt-0">
      <FaCode className="text-7xl opacity-30" />
    </div>
  </div>
);

// const tabs = [
//   {
//     name: "Digital Onboarding",
//     value: "onboarding",
//     content: [
//       {
//         title: "User Registration",
//         description: "Register a new user with KYC verification.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/register",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//       {
//         title: "Document Upload",
//         description: "Upload identity documents details for onboarding.",
//         method: "POST",
//         endpoint: "/api/v1/onboarding/upload",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Risk, Fraud & AML",
//     value: "risk",
//     content: [
//       {
//         title: "Fraud Check",
//         description: "Check user against fraud databases.",
//         method: "GET",
//         endpoint: "/api/v1/risk/fraud-check",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Global Verification",
//     value: "global",
//     content: [
//       {
//         title: "Passport Verification",
//         description: "Verify passport details globally.",
//         method: "POST",
//         endpoint: "/api/v1/global/passport",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Vehical & Asset",
//     value: "vehical",
//     content: [
//       {
//         title: "Vehical RC V2",
//         description: "vehical Detaisl generation.",
//         method: "POST",
//         endpoint: "/api/v1/vehical/verification",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Fincancial Accounts Verification",
//     value: "fincancial",
//     content: [
//       {
//         title: "Vehical RC V2",
//         description: "vehical Detaisl generation.",
//         method: "POST",
//         endpoint: "/api/v1/vehical/verification",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Consent & digital signature",
//     value: "consent",
//     content: [
//       {
//         title: "Vehical RC V2",
//         description: "vehical Detaisl generation.",
//         method: "POST",
//         endpoint: "/api/v1/vehical/verification",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Business & Entity Verification",
//     value: "business",
//     content: [
//       {
//         title: "Vehical RC V2",
//         description: "vehical Detaisl generation.",
//         method: "POST",
//         endpoint: "/api/v1/vehical/verification",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Contact & Communication",
//     value: "contact",
//     content: [
//       {
//         title: "Vehical RC V2",
//         description: "vehical Detaisl generation.",
//         method: "POST",
//         endpoint: "/api/v1/vehical/verification",
//         auth: "API Key",
//       },
//     ],
//   },
//   {
//     name: "Lending & Underwriting",
//     value: "lending",
//     content: [
//       {
//         title: "Vehical RC V2",
//         description: "vehical Detaisl generation.",
//         method: "POST",
//         endpoint: "/api/v1/vehical/verification",
//         auth: "API Key",
//       },
//     ],
//   },
// ];

const tabs = apiJsonData.categories;

const ApiDocs = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const fuseOptions = {
    includeScore: true,
    threshold: 0.3,
    keys: ["title", "description", "method", "endpoint"],
  };
  const handleSearchResult = (e) => {
    setSearch(e.target.value);
    const apidocsList = tabs.reduce(
      (prev, tabcontent) => [...prev, ...tabcontent.content],
      []
    );
    const fuse2 = new Fuse(apidocsList, fuseOptions);
    const res2 = fuse2.search(e.target.value);
    console.log(apidocsList);
    console.log(res2);
    setSearchResult(res2);
  };
  return (
    <div className="md:px-5 py-5 relative top-12">
      <ApiDocsHero />
      <div className="lg:w-[60%] w-[90%] mx-auto">
        <Input
          type="search"
          placeholder="Search APIs details..."
          className="mb-5 py-7 lg:rounded-4xl rounded-2xl border-1 border-teal-600  focus:shadow-teal-700"
          onChange={handleSearchResult}
        />
      </div>
      <div className="w-full mx-auto">
        <div className="w-full p-6 flex flex-col gap-6 mx-auto">
          {search.length !== 0 ? (
            <p className="text-sm font-medium text-gray-700">
              {searchResult.length} Matching Result Found.
            </p>
          ) : null}

          <Tabs defaultValue={tabs[0].value} className="max-w-full w-full">
            {searchResult.length === 0 && search.length === 0 ? (
              <TabsList
                className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
    gap-2 p-0 bg-background border-b rounded-none h-fit"
              >
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-md text-center bg-background py-2 px-1 gap-2 
        data-[state=active]:shadow-sm border border-transparent 
        data-[state=active]:border-[#00B8AA] 
        data-[state=active]:bg-gradient-to-br from-[#f3fffd] to-[#f8fcff] min-w-fit"
                  >
                    <code className="text-[14px] font-sans">{tab.name}</code>
                  </TabsTrigger>
                ))}
              </TabsList>
            ) : (
              ""
            )}
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="w-full">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 
                  border rounded-md mt-7 p-5 mx-auto overflow-y-auto max-h-[54vh]"
                >
                  {searchResult.length === 0 && search.length === 0
                    ? tab.content.map((item, idx) => (
                        <Card
                          key={idx}
                          className="w-full shadow-lg border-0 bg-gradient-to-br from-[#f3fffd] to-[#f8fcff] hover:scale-[1.03] transition-transform duration-200 h-auto"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-[#00B8AA]">
                              {item.apiName}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {item.overview}
                            </CardDescription>
                          </CardHeader>
                          {/* <CardContent className="py-2">
                            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                              <li>
                                Method:{" "}
                                <span className="font-semibold text-[#00B8AA]">
                                  {item.method}
                                </span>
                              </li>
                              <li>
                                Endpoint:{" "}
                                <span className="font-mono text-xs text-[#00859D]">
                                  {item.endpoint}
                                </span>
                              </li>
                              <li>
                                Auth:{" "}
                                <span className="font-semibold text-green-600">
                                  {item.auth}
                                </span>
                              </li>
                            </ul>
                          </CardContent> */}
                          <CardFooter className="pt-2 flex justify-end">
                            <button className="group relative px-5 py-2 rounded-lg bg-gradient-to-r from-[#00B8AA] to-[#00859D] text-white font-semibold shadow-md overflow-hidden transition-all duration-200 hover:from-[#00859D] hover:to-[#00B8AA] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00B8AA] focus:ring-offset-2">
                              <span className="relative z-10 flex items-center gap-2">
                                Read more
                                <svg
                                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </span>
                              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-200"></span>
                            </button>
                          </CardFooter>
                        </Card>
                      ))
                    : searchResult.map(({ item }, idx) => (
                        <Card
                          key={idx}
                          className="w-full shadow-lg border-0 bg-gradient-to-br 
                          from-[#f3fffd] to-[#f8fcff] hover:scale-[1.03] transition-transform duration-200 md:h-[240px] sm:h-[270px]"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-[#00B8AA]">
                              {item.apiName}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {item.overview}
                            </CardDescription>
                          </CardHeader>
                          {/* <CardContent className="py-2">
                            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                              <li>
                                Method:{" "}
                                <span className="font-semibold text-[#00B8AA]">
                                  {item.method}
                                </span>
                              </li>
                              <li>
                                Endpoint:{" "}
                                <span className="font-mono text-xs text-[#00859D]">
                                  {item.endpoint}
                                </span>
                              </li>
                              <li>
                                Auth:{" "}
                                <span className="font-semibold text-green-600">
                                  {item.auth}
                                </span>
                              </li>
                            </ul>
                          </CardContent> */}
                          <CardFooter className="pt-2 flex justify-end">
                            <button className="group relative px-5 py-2 rounded-lg bg-gradient-to-r from-[#00B8AA] to-[#00859D] text-white font-semibold shadow-md overflow-hidden transition-all duration-200 hover:from-[#00859D] hover:to-[#00B8AA] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00B8AA] focus:ring-offset-2">
                              <span className="relative z-10 flex items-center gap-2">
                                Read more
                                <svg
                                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </span>
                              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-200"></span>
                            </button>
                          </CardFooter>
                        </Card>
                      ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;

// min-h-[270px] max-h-[250px] sm:min-h-[270px] md:min-h-[250px] lg:min-h-[240px]
