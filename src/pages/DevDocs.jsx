import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { act, useEffect, useRef, useState } from "react";
import { FaBook, FaCode, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiJsonData from "../../data.json";

const ApiDocsHero = () => (
  <div className="bg-gradient-to-r from-[#024888] to-[#00BAAB] text-white rounded-xl p-6 mb-5 shadow flex flex-col md:flex-row items-center justify-between">
    <div>
      <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
        <FaBook className="inline-block mb-1" /> Developer API Documentation
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

const tabs = apiJsonData.categories;
const DevDocs = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const fuseOptions = {
    includeScore: true,
    threshold: 0.3,
    keys: ["apiName", "overview", "label", "url", "method"],
  };
  const handleSearchResult = (e) => {
    setSearch(e.target.value);
    const apidocsList = tabs.reduce(
      (prev, tabcontent) => [...prev, ...tabcontent.content],
      []
    );
    const fuse2 = new Fuse(apidocsList, fuseOptions);
    const res2 = fuse2.search(e.target.value);
    setSearchResult(res2);
  };

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDown.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="md:px-5 py-5 relative top-12">
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
        <div className="w-full p-6 flex flex-col gap-6 mx-auto">
          {search.length !== 0 ? (
            <p className="text-sm font-medium text-gray-700">
              {searchResult.length} Matching Result Found.
            </p>
          ) : null}

          <Tabs defaultValue={tabs[0].value} className="w-full">
            {searchResult.length === 0 && search.length === 0 ? (
              <TabsList
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="w-full flex gap-1 p-0 bg-background justify-start border-b rounded-none 
        overflow-x-auto no-scrollbar scroll-smooth cursor-grab select-none"
              >
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="shrink-0 rounded-none bg-background h-full 
            data-[state=active]:shadow-none border border-transparent border-b-[#00B8AA] border-r-[#00B8AA] 
            data-[state=active]:border-[#00B8AA] data-[state=active]:border-b-background -mb-[2px] rounded-t 
            data-[state=active]:bg-gradient-to-br from-[#f3fffd] to-[#f8fcff] data-[state=active]:border-l-0"
                  >
                    <code className="text-[14px] font-sans">{tab.name}</code>
                  </TabsTrigger>
                ))}
              </TabsList>
            ) : null}
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="w-full">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 
            border rounded-md mt-7 p-5 mx-auto overflow-y-auto max-h-[68vh]"
                >
                  {searchResult.length === 0 && search.length === 0
                    ? tab.content.map((item, idx) => (
                        <Card
                          key={idx}
                          className="w-full shadow-lg border-0 bg-gradient-to-br from-[#f3fffd] to-[#f8fcff] hover:scale-[1.03] transition-transform duration-200 h-auto flex flex-col justify-between"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-[#00B8AA]">
                              {item.apiName}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {item.overview}
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
                                  {item.url}
                                </span>
                              </li>
                              <li>
                                Auth:{" "}
                                <span className="font-semibold text-green-600">
                                  {/* {item.auth} */ "API Key"}
                                </span>
                              </li>
                            </ul>
                          </CardContent>
                          <CardFooter className="pt-2 flex justify-end">
                            <button className="group relative px-5 py-2 rounded-lg bg-gradient-to-r from-[#00B8AA] to-[#00859D] text-white font-semibold shadow-md overflow-hidden transition-all duration-200 hover:from-[#00859D] hover:to-[#00B8AA] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00B8AA] focus:ring-offset-2">
                              <Link
                                to={
                                  item["devDocsId"] != undefined
                                    ? `/devdocs/${item.devDocsId}`
                                    : "/devdocs"
                                }
                              >
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
                              </Link>
                              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-200"></span>
                            </button>
                          </CardFooter>
                        </Card>
                      ))
                    : searchResult.map(({ item }, idx) => (
                        <Card
                          key={idx}
                          className="w-full shadow-lg border-0 bg-gradient-to-br 
                    from-[#f3fffd] to-[#f8fcff] hover:scale-[1.03] transition-transform duration-200 md:h-[300px] sm:h-[270px] flex flex-col justify-between"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-[#00B8AA]">
                              {item.apiName}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mt-1">
                              {item.overview}
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
                                  {item.url}
                                </span>
                              </li>
                              <li>
                                Auth:{" "}
                                <span className="font-semibold text-green-600">
                                  {/* {item.auth} */ "API Key"}
                                </span>
                              </li>
                            </ul>
                          </CardContent>
                          <CardFooter className="pt-2 flex justify-end">
                            <button className="group relative px-5 py-2 rounded-lg bg-gradient-to-r from-[#00B8AA] to-[#00859D] text-white font-semibold shadow-md overflow-hidden transition-all duration-200 hover:from-[#00859D] hover:to-[#00B8AA] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00B8AA] focus:ring-offset-2">
                              <Link
                                to={
                                  item["devDocsId"] != undefined
                                    ? `/devdocs/${item.devDocsId}`
                                    : "/devdocs"
                                }
                              >
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
                              </Link>
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

export default DevDocs;
