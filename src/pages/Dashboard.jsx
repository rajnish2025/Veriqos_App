import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import instance from "@/utilities/iniciate";
import CodeBlocks from "../components/CodeBlocks";
import { useLocation, useParams } from "react-router-dom";
import jsonApiData from "../../data.json";
import { toast } from "sonner";
import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";
import { format } from "date-fns";

const DashBoard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [response, setResponse] = useState(null);
  const [downloadResponse, setDownloadResponse] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [apiTestData, setApiTestData] = useState(null);
  const location = useLocation();
  const params = useParams();
  const [showLoader, setShowLoader] = useState(false);

  const marketingAPIs = [
    {
      title: "🚗 Vehicle RC V2 API",
      desc: "Fetch detailed vehicle registration data instantly.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "💳 Fastag API",
      desc: "Check balance & details of any Fastag-enabled vehicle.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "⚠️ Challan API",
      desc: "Get live challan & penalty details by vehicle number.",
      gradient: "from-red-500 to-orange-600",
    },
    {
      title: "📜 License Verification API",
      desc: "Validate driving licenses with real-time government data.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "🏦 PAN Verification API",
      desc: "Instant PAN card verification for KYC & compliance.",
      gradient: "from-yellow-400 to-amber-500",
    },
    {
      title: "👤 Aadhaar Masking API",
      desc: "Mask Aadhaar details securely for compliance & safety.",
      gradient: "from-teal-500 to-cyan-600",
    },
  ];

  const options = [
    {
      value: "1",
      label: "Vehicle RC V2 API",
      url: "/rc/v2",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "<api_key>",
      },
      body: { vehicle_number: "text" },
      code: {
        Curl: `{curl --location 'https://dev-api.innowave.solutions/rc/v2' \n\
--header 'x-api-key: <api-key>' \n\
--header 'Content-Type: application/json' \n\
--data '{
    "vehicle_number": "vehicale_number_value"
    }'}
`,
        JavaScript: `import axios from "axios";
  const response = await axios.post("https://dev-api.innowave.solutions/rc/v2",
    {vehicle_number: "vehicle_number_value",},
    {headers: {"x-api-key": "<api-key>","Content-Type": "application/json",},
  }
);
`,
      },
    },

    {
      value: "2",
      label: "Fastag API",
      url: "/rc/fastag-details",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "<api_key>",
      },
      body: { vehicle_number: "text" },
      code: {
        Curl: `curl --location 'https://dev-api.innowave.solutions/rc/fastag-details' \n\
--header 'x-api-key: <api-key>' \n\
--header 'Content-Type: application/json' \n\
--data '{
    "vehicle_number": "vehicale_number_value"
    }'
`,
        JavaScript: `import axios from "axios";
  const response = await axios.post("https://dev-api.innowave.solutions/rc/fastag-details",
    {vehicle_number: "vehicle_number_value",},
    {headers: {"x-api-key": "<api-key>","Content-Type": "application/json",},
  }
);
`,
      },
    },
    {
      value: "3",
      label: "Challan API",
      url: "/rc/challan-details",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "<api_key>",
      },
      body: { vehicle_number: "text" },
      code: {
        Curl: `curl --location 'https://dev-api.innowave.solutions/rc/fastag-details' \n\
--header 'x-api-key: <api-key>' \n\
--header 'Content-Type: application/json' \n\
--data '{
    "vehicle_number": "UP53EB7078"
    }'
`,
        JavaScript: `import axios from "axios";
  const response = await axios.post("https://dev-api.innowave.solutions/rc/fastag-details",
    {vehicle_number: "vehicle_number_value",},
    {headers: {"x-api-key": "<api-key>","Content-Type": "application/json",},
  }
);
`,
      },
    },
  ];

  const handleChange = (option) => {
    reset();
    setSelectedOption(option);
  };
  useEffect(() => {
    if (params.hasOwnProperty("id") && params.hasOwnProperty("id")) {
      const { catId, id } = params;
      const apiData = jsonApiData.categories
        .filter((category) => category.catId === catId)[0]
        .content.filter((api) => api.id === id);
      setApiTestData(apiData[0]);
    }
  }, []);

  const DateFormating = (data) => {
    for (let key in data) {
      if (data[key].match(/\d{4}-\d{2}-\d{2}/)) {
        let formatedDate = format(data[key], apiTestData.date_format);
        console.log(formatedDate);
        data[key] = formatedDate;
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setShowLoader(true);

      if (apiTestData !== null) {
        if (apiTestData["date_format"] !== null) {
          DateFormating(data);
        }
        apiTestData.headers["x-api-key"] = import.meta.env.VITE_API_TOKEN_KEY;
      } else {
        selectedOption.headers["x-api-key"] =
          import.meta.env.VITE_API_TOKEN_KEY;
      }

      const apiUrl =
        selectedOption != null
          ? selectedOption.url
          : import.meta.env.VITE_PRODUCTION === "false"
          ? apiTestData.url
          : apiTestData.serverUrl;

      const result = await instance({
        method:
          apiTestData !== null ? apiTestData.method : selectedOption.method,
        url: apiUrl,
        data: data,
        headers:
          selectedOption == null ? apiTestData.headers : selectedOption.headers,
      }).catch((error) => {
        throw error;
      });

      const validResultData = result?.data ?? result;
      setDownloadResponse(validResultData);

      setResponse(
        Object.keys(validResultData).includes("result")
          ? Array.isArray(result.data.result)
            ? result.data.result[0]
            : result.data
          : result.data
      );

      toast.success(result.data.message || "Request successful");
    } catch (error) {
      let message = "An error occurred";

      if (error.code === "ERR_NETWORK") {
        message =
          "There was a network error. Please check your connection or server status.";
        console.error("Network Error:", error);
      } else if (error.response) {
        if (error.response.status === 400) {
          message =
            error.response.data.message ||
            error.message ||
            error.response.message ||
            "Invalid request parameters";
        } else if (error.response.status === 404) {
          message = "API endpoint not found.";
        } else {
          message =
            error.response.data.message ||
            error.message ||
            JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        message = error.message;
      }

      console.log("Full error details:", error);

      toast.error(message);
    } finally {
      setShowLoader(false);
    }
  };

  const renderTable = (data, level = 0) => {
    // Handle primitives & null
    if (typeof data !== "object" || data === null) {
      return <span className="text-gray-800">{String(data)}</span>;
    }

    // Handle arrays
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return (
          <div className="text-gray-500 italic px-3 py-2">[ Empty Array ]</div>
        );
      }
      return (
        <div className={`ml-${level * 2} my-3`}>
          {data.map((item, idx) => (
            <div
              key={idx}
              className="overflow-x-auto mb-4 border border-slate-200 rounded-xl shadow-md bg-gradient-to-br from-white to-slate-50"
            >
              {typeof item !== "string" ? (
                <>
                  {/* <div className="px-4 py-2 bg-blue-50 border-b font-semibold text-blue-700">
                    No. [{idx + 1}]
                  </div> */}
                  <div className="p-2">{renderTable(item, level + 1)}</div>
                </>
              ) : (
                <li className="pl-5 py-4">{item}</li>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Handle objects
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return (
        <div className="text-gray-500 italic px-3 py-2">
          {`{ Empty Object }`}
        </div>
      );
    }

    return (
      <div
        className={`ml-${
          level * 2
        } my-3 overflow-x-auto border border-slate-200 rounded-xl shadow-md bg-gradient-to-br from-white to-slate-50`}
      >
        <table className="min-w-full text-sm md:text-base">
          {entries.map(([key, value], idx) => (
            <tbody key={key}>
              <tr
                className={`transition hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                }`}
              >
                {/* Key Column */}
                <th
                  className={`px-4 py-3 text-left align-top font-bold text-[#034487] whitespace-nowrap ${
                    level === 0 ? "bg-blue-100" : "bg-slate-100"
                  }`}
                  style={{ minWidth: 160 }}
                >
                  {key.split("_").join(" ").toUpperCase()}
                </th>
              </tr>
              <tr
                className={`transition hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                }`}
              >
                {/* Value Column */}
                <td className="px-4 py-3 text-gray-900 align-top">
                  {typeof value === "object" && value !== null ? (
                    <div className="mt-2">{renderTable(value, level + 1)}</div>
                  ) : (
                    <span>{String(value)}</span>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-full px-4 py-10 relative top-40">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-16">
          {/* this block is for when user directly open sandbox from. */}
          {location.pathname === "/sandbox" ? (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00538C] to-[#00859D] bg-clip-text text-transparent">
                Select & Test API
              </h2>
              <Select
                options={options}
                className="w-full mb-4"
                onChange={handleChange}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#E0F2FE",
                    primary: "#00538C",
                  },
                })}
              />
              {selectedOption && selectedOption.body && (
                <form
                  className="mt-4 flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {Object.entries(selectedOption.body).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label
                        htmlFor={key}
                        className="mb-1 text-sm font-semibold text-gray-700"
                      >
                        {key.split("_").join(" ").toUpperCase()}
                      </label>
                      <input
                        type={value}
                        name={key}
                        id={key}
                        {...register(key)}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="mt-2 px-6 py-3 bg-gradient-to-r from-[#00538C] to-[#00859D] text-white font-semibold rounded-xl shadow-md hover:from-[#00859D] hover:to-[#00538C] transition w-full md:w-auto"
                  >
                    🚀 Send Request
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* this block is for when user open sandbox from dashboard. */
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00538C] to-[#00859D] bg-clip-text text-transparent">
                {apiTestData && apiTestData.apiName}
              </h2>
              {apiTestData && apiTestData.body && (
                <form
                  className="mt-4 flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {Object.entries(apiTestData.body).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label
                        htmlFor={key}
                        className="mb-1 text-sm font-semibold text-gray-700"
                      >
                        {key.split("_").join(" ").toUpperCase()}
                      </label>
                      <input
                        type={value}
                        name={key}
                        id={key}
                        {...register(key)}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="mt-2 px-6 py-3 bg-gradient-to-r from-[#00538C] to-[#00859D] text-white font-semibold rounded-xl shadow-md hover:from-[#00859D] hover:to-[#00538C] transition w-full md:w-auto"
                  >
                    🚀 Send Request
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Right Block: CodeBlock */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00538C] to-[#00859D] bg-clip-text text-transparent">
                cURL Preview
              </h2>
              <span>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00538C] to-[#00859D] text-white font-semibold shadow hover:from-[#00859D] hover:to-[#00538C] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  onClick={() => {
                    if (downloadResponse) {
                      const json = JSON.stringify(downloadResponse, null, 2);
                      const blob = new Blob([json], {
                        type: "application/json",
                      });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "response.json";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }
                  }}
                  disabled={!downloadResponse}
                  title={response ? "Download JSON" : "No response to download"}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h12"
                    />
                  </svg>
                  Download JSON
                </button>
              </span>
            </div>
            <div className="mt-6">
              <CodeBlocks
                code={
                  selectedOption?.code
                    ? selectedOption.code
                    : params.hasOwnProperty("catId") &&
                      params.hasOwnProperty("id")
                    ? apiTestData && apiTestData.code[0]
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* Response Section */}
        {response ? (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#024688] to-[#03BEAC] bg-clip-text text-transparent">
              Response
            </h2>
            <div className="border-2 border-gray-200 rounded-xl min-h-[250px] w-full p-4 bg-white overflow-x-auto shadow-inner">
              {response ? (
                renderTable(
                  Object.fromEntries(
                    Object.entries(response).filter(([key]) => {
                      const responseId =
                        response.responseId ?? response.response_id;
                      if (key === "message" && responseId === 1001) {
                        return false;
                      }
                      return (
                        key !== "status" &&
                        key !== "responseId" &&
                        key !== "response_id"
                      );
                    })
                  )
                )
              ) : (
                <span className="text-gray-500 italic">
                  Response data will appear here...
                </span>
              )}
            </div>
          </div>
        ) : (
          showLoader && (
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#024688] to-[#03BEAC] bg-clip-text text-transparent flex justify-start gap-5">
              Response
              <LineSpinner size="30" stroke="3" speed="1" color="#024688" />
            </h2>
          )
        )}
      </div>

      <section className="max-w-7xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#024688] to-[#006C95] bg-clip-text text-transparent">
          Explore Our APIs
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marketingAPIs.map((api, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${api.gradient} text-white hover:scale-[1.02] transition`}
            >
              <h3 className="text-xl font-semibold mb-2">{api.title}</h3>
              <p className="text-sm opacity-90">{api.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
