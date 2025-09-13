import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import jsonData from "../../data.json";
import { Link, useNavigate } from "react-router-dom";

const tabs = jsonData.categories;

const Home = () => {
  const navigate = useNavigate();

  const handRedirectMode = (event, data) => {
    event.preventDefault();
    console.log(event, data);
    const stored = localStorage.getItem("production");
    if (stored !== null) {
      if (stored === "true") {
        navigate(data.testUlr);
      } else {
        navigate(data.sandboxUrl);
      }
    }
    console.log(typeof stored);
  };

  return (
    <div className="w-full flex flex-col justify-center mt-10 box-border relative top-40">
      <div className="w-[90%] mx-auto border-b-1 pb-6">
        <h2 className="text-3xl font-bold mb-2">Veriqos API Sandbox</h2>
        <p className="text-lg">
          Welcome to the Veriqos API Sandbox. This is your space to try out our
          APIs, see how they work, and test integrations in a safe environment.
        </p>
      </div>
      <div className="w-[90%] flex flex-wrap gap-2 mt-10 mx-auto h-full">
        <Tabs defaultValue="onboarding" className="flex-row">
          <TabsList className="bg-background flex-col rounded-none border-l p-0 pr-5 h-[60vh] border-r border-r-gray-400">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-[10vh] bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex flex-wrap gap-3 items-start justify-start pl-10 max-h-fit"
            >
              {tab.content.map((item, idx) => (
                <Link
                  onClick={(event) =>
                    handRedirectMode(event, {
                      sandboxUrl: `/sandbox/${tab.catId}/${item.id}`,
                      testUlr: `/devApi/test/${tab.catId}/${item.id}`,
                    })
                  }
                  key={idx}
                >
                  <Card className="lg:w-60 sm:w-44 h-[10vh] text-center max-w-sm shadow-lg border-1 border-[#c8dddc] bg-[#fff] hover:scale-[1.03] transition-transform duration-200 flex justify-center items-center">
                    <CardContent className="pt-5">{item.apiName}</CardContent>
                  </Card>
                </Link>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
