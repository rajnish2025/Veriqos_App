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

const ApiDocsHero = () => (
  <div className="bg-gradient-to-r from-[#024888] to-[#00BAAB] text-white rounded-xl p-8 mb-10 shadow flex flex-col md:flex-row items-center justify-between">
    <div>
      <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
        <FaBook className="inline-block mb-1" /> Veriqos API Documentation
      </h1>
      <p className="text-lg mb-3 max-w-xl">
        Integrate your applications with Veriqos using our secure and robust
        RESTful APIs. Below you'll find comprehensive guides and documentation
        to help you start working with our APIs as quickly as possible.
      </p>
      <Link
        to="/devdocs"
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

const tabs = [
  {
    name: "Digital Onboarding",
    value: "onboarding",
    content: [
      {
        title: "User Registration",
        description: "Register a new user with KYC verification.",
        method: "POST",
        endpoint: "/api/v1/onboarding/register",
        auth: "API Key",
      },
      {
        title: "Document Upload",
        description: "Upload identity documents details for onboarding.",
        method: "POST",
        endpoint: "/api/v1/onboarding/upload",
        auth: "API Key",
      },
    ],
  },
  {
    name: "Risk, Fraud & AML",
    value: "risk",
    content: [
      {
        title: "Fraud Check",
        description: "Check user against fraud databases.",
        method: "GET",
        endpoint: "/api/v1/risk/fraud-check",
        auth: "API Key",
      },
    ],
  },
  {
    name: "Global Verification",
    value: "global",
    content: [
      {
        title: "Passport Verification",
        description: "Verify passport details globally.",
        method: "POST",
        endpoint: "/api/v1/global/passport",
        auth: "API Key",
      },
    ],
  },
  {
    name: "Vehical & Asset",
    value: "vehical",
    content: [
      {
        title: "Vehical RC V2",
        description: "vehical Detaisl generation.",
        method: "POST",
        endpoint: "/api/v1/vehical/verification",
        auth: "API Key",
      },
    ],
  },
  // {
  //   name: "Fincancial Accounts Verification",
  //   value: "fincancial",
  //   content: [1, 2],
  // },
  // {
  //   name: "Consent & digital signature",
  //   value: "consent",
  //   content: [1, 2],
  // },
  // {
  //   name: "Business & Entity Verification",
  //   value: "business",
  //   content: [1, 2],
  // },
  // {
  //   name: "Contact & Communication",
  //   value: "contact",
  //   content: [1, 2],
  // },
  // {
  //   name: "Lending & Underwriting",
  //   value: "lending",
  //   content: [1, 2],
  // },
];

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
    <div className="md:px-5 py-5">
      <ApiDocsHero />
      <div className="lg:w-[60%] w-[90%] mx-auto">
        <Input
          type="search"
          placeholder="Search APIs details..."
          className="mb-5 py-7 lg:rounded-4xl rounded-2xl"
          onChange={handleSearchResult}
        />
      </div>
      <div className="w-full mx-auto">
        <div className="w-full p-6 flex flex-wrap gap-6 mx-auto">
          {search.length !== 0
            ? `${searchResult.length} Matching Result Found.`
            : ""}
          <Tabs defaultValue={tabs[0].value} className="max-w-screen w-full">
            {searchResult.length === 0 && search.length === 0 ? (
              <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-transparent border-b-[#00B8AA] border-r-[#00B8AA] data-[state=active]:border-[#00B8AA] data-[state=active]:border-b-background -mb-[2px] rounded-t data-[state=active]:bg-gradient-to-br from-[#f3fffd] to-[#f8fcff] data-[state=active]:border-l-0"
                  >
                    <code className="text-[14px] font-sans">{tab.name}</code>
                  </TabsTrigger>
                ))}
              </TabsList>
            ) : (
              ""
            )}
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="flex flex-wrap border gap-5 rounded-md mt-7 p-5 mx-auto">
                  {searchResult.length === 0 && search.length === 0
                    ? tab.content.map((item, idx) => (
                        <Card
                          className="w-full max-w-sm shadow-lg border-0 bg-gradient-to-br from-[#f3fffd] to-[#f8fcff] hover:scale-[1.03] transition-transform duration-200"
                          key={idx}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-[#00B8AA]">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="py-2">
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
                          </CardContent>
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
                          className="w-full max-w-sm shadow-lg border-0 bg-gradient-to-br from-[#f3fffd] to-[#f8fcff] hover:scale-[1.03] transition-transform duration-200"
                          key={idx}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-[#00B8AA]">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="py-2">
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
                          </CardContent>
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
