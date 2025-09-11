import CodeBlocks from "@/components/CodeBlock";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const CodeBlock = ({ code, language = "json", backgound = "bg-gray-900" }) => (
  <pre
    className={`rounded-xl ${backgound} text-white text-sm p-4 overflow-x-auto`}
  >
    <code>
      {typeof code === "object" ? JSON.stringify(code, null, 2) : code}
    </code>
  </pre>
);

const DevTestApi = () => {
  const location = useLocation();
  const rowData = location.state?.rowData || location.state || {};
  const [jsonResponse, setJsonResponse] = useState(null);
  const { register, handleSubmit } = useForm();
  console.log(rowData);
  const [response, setResponse] = useState(null);

  const onSubmit = async (data) => {
    const result = await axios.post(rowData.url, data, {
      headers: rowData.headers,
    });
    setJsonResponse(result.data);
    setResponse(
      Object.keys(result.data).includes("result")
        ? result.data.result[0]
        : result.data
    );
  };

  const body = rowData.body || {
    vehicleNumber: "string",
    ownerName: "string",
    registrationDate: "date",
    isActive: "boolean",
  };

  const curlUrl =
    rowData.code?.Curl ||
    `curl -X POST https://api.example.com/test -d '${JSON.stringify(body)}'`;

  const handleCopy = (text) => {
    if (typeof text === "object") {
      navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const renderTable = (data, level = 0) => {
    // Handle primitives & null
    if (typeof data !== "object" || data === null) {
      return <span className="text-gray-800">{String(data)}</span>;
    }
    console.log(data);
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
              <div className="px-4 py-2 bg-blue-50 border-b font-semibold text-blue-700">
                Item {idx + 1}
              </div>
              <div className="p-2">{renderTable(item, level + 1)}</div>
            </div>
          ))}
        </div>
      );
    }

    // Handle objects
    const entries = Object.entries(data);
    console.log(entries, data);
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

  const CopyIcon = ({ onClick }) => (
    <button
      onClick={onClick}
      className="ml-2 p-1 rounded hover:bg-gray-200 transition"
      aria-label="Copy to clipboard"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect
          x="9"
          y="9"
          width="13"
          height="13"
          rx="2"
          fill="none"
          stroke="currentColor"
        />
        <rect
          x="3"
          y="3"
          width="13"
          height="13"
          rx="2"
          fill="none"
          stroke="currentColor"
        />
      </svg>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-2 py-6 sm:px-4 sm:py-10">
      <div className="w-full max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="flex col-span-2 flex-col gap-6 sm:gap-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#00538C] to-[#00859D] bg-clip-text text-transparent">
              {rowData.label || "API Details"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6">
              <form
                className="mt-4 flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {Object.entries(rowData.body).map(([key, value]) => (
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
            </div>
          </div>
          {response ? (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#024688] to-[#03BEAC] bg-clip-text text-transparent">
                Response
              </h2>
              <div className="border-2 border-gray-200 rounded-xl min-h-[250px] w-full p-4 bg-white overflow-x-auto shadow-inner">
                {response ? (
                  renderTable(
                    Object.fromEntries(
                      Object.entries(response).filter(
                        ([key]) =>
                          key !== "message" &&
                          key !== "responseId" &&
                          key !== "status" &&
                          key !== "response_id"
                      )
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
            ""
          )}
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#00538C] to-[#00859D] bg-clip-text text-transparent">
                cURL Preview
              </h2>
              <CopyIcon onClick={() => handleCopy(curlUrl)} />
            </div>
            <CodeBlock
              code={curlUrl}
              language="bash"
              backgound="bg-[#043758]"
            />
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#024688] to-[#03BEAC] bg-clip-text text-transparent">
                JSON Response
              </h2>
              <CopyIcon onClick={() => handleCopy(jsonResponse)} />
            </div>
            <CodeBlock
              code={jsonResponse}
              language="json"
              backgound="bg-[#043758]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTestApi;
