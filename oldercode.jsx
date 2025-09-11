// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import Select from 'react-select';
// import axios from 'axios';
// import CodeBlocks from '../components/CodeBlock';

// const DashBoard = () => {
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [response, setResponse] = useState(null);
//     const { register, handleSubmit,reset } = useForm();

//     const options = [
//         { value: '1', label: 'Vehicle RC V2 API',url:'/api/rc/v2', method:'POST', headers: { 'Content-Type': 'application/json', 'x-api-key':'0iFX0CHjYL6gm3zZ7eeyd89LYBOPrUHq6QiqvpEv'},body:{vehicle_number:'text'}, 
//         curl_url:   `curl --location 'https://dev-api.innowave.solutions/rc/v2' \
// --header 'x-api-key: <api-key>' \
// --header 'Content-Type: application/json' \ 
// --data '{
//     "vehicle_number": "vehicle_number_value"
// }'`},
//         { value: '2', label: 'Fastag API',url:'/api/rc/fastag-details', method:'POST', headers: { 'Content-Type': 'application/json', 'x-api-key':'0iFX0CHjYL6gm3zZ7eeyd89LYBOPrUHq6QiqvpEv'},body:{vehicle_number:'text'},
//         curl_url: `curl --location 'https://dev-api.innowave.solutions/rc/fastag-details' \
// --header 'Content-Type: application/json' \
// --header 'x-api-key: <api-key>' \
// --data '{
//     "vehicle_number": "vehicle_number_value"
// }'`
//     },
//         { value: '3', label: 'Challan API',url:'/api/rc/challan-details', method:'POST', headers: { 'Content-Type': 'application/json', 'x-api-key':'0iFX0CHjYL6gm3zZ7eeyd89LYBOPrUHq6QiqvpEv'},body:{vehicle_number:'text'},
//         curl_url: `curl --location 'https://dev-api.innowave.solutions/rc/challan-details' \
// --header 'Content-Type: application/json' \
// --header 'x-api-key: <apikey>' \
// --data '{
//     "vehicle_number": "vehicle_number_value"
// }'`
//      }
//     ];
    
//     const handleChange = (option) => {
//         console.log('Selected option:', option);
//         reset();
//         setSelectedOption(option);
//     };
//     const handleButtonClick = () => {
//         if (selectedOption) {
//             console.log('Button clicked for option:', selectedOption);
            
//         }
//     }
//     const onSubmit = async (data) => {
//         console.log(data,selectedOption);
//         const result = await axios.post(selectedOption.url, data, { headers: selectedOption.headers });
//         console.log(result);
//         setResponse(Object.keys(result.data).includes('result') ? result.data.result[0] : result.data);
//     }

//     const renderTable = (data, level = 0) => {
//         if (typeof data !== 'object' || data === null) {
//             return <span className="text-gray-800">{String(data)}</span>;
//         }

//         if (Array.isArray(data)) {
//             return (
//                 <div className={`overflow-x-auto ml-${level * 2}`}>
//                     <table className="min-w-full border border-slate-200 rounded-lg shadow-sm bg-gradient-to-br from-white to-slate-50">
//                         <tbody>
//                             {data.map((item, idx) => (
//                                 <tr key={idx} className="even:bg-slate-50 odd:bg-white">
//                                     <td className="border px-4 py-3 text-sm">{renderTable(item, level + 1)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             );
//         }

//         return (
//             <div className={`overflow-x-auto ml-${level * 2}`}>
//                 <table className="min-w-full border border-slate-200 rounded-lg shadow-md bg-gradient-to-br from-white to-slate-50">
//                     <tbody>
//                         {Object.entries(data).map(([key, value], idx) => (
//                             <tr
//                                 key={key}
//                                 className={`transition hover:bg-blue-50 ${idx % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
//                             >
//                                 <th
//                                     className={`border px-4 py-3 text-left align-top font-bold text-blue-700 whitespace-nowrap ${level === 0 ? "bg-blue-100" : "bg-slate-100"}`}
//                                     style={{ minWidth: 120 }}
//                                 >
//                                     {key.split('_').join(' ').toUpperCase()}
//                                 </th>
//                                 <td className="border px-4 py-3 text-gray-900 align-top">
//                                     {renderTable(value, level + 1)}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="flex flex-col gap-8 px-4 py-6 md:flex-row md:items-start md:justify-between md:px-10 md:py-10">
//                 <div className="w-full md:w-1/2">
//                     <h2 className="text-lg font-semibold mb-2">Select API</h2>
//                     <Select options={options} className="w-full" onChange={handleChange} />
//                     {selectedOption && selectedOption.body && (
//                         <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//                             {Object.entries(selectedOption.body).map(([key, value]) => (
//                                 <div key={key} className="flex flex-col">
//                                     <label htmlFor={key} className="mb-1 text-sm font-medium">{key.split('_').join(' ').toUpperCase()}</label>
//                                     <input
//                                         type={value}
//                                         name={key}
//                                         id={key}
//                                         {...register(key)}
//                                         className="block w-full outline-1 grow py-2 px-2 text-base text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded"
//                                     />
//                                 </div>
//                             ))}
//                             <button
//                                 type="submit"
//                                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full md:w-auto"
//                                 onClick={handleButtonClick}
//                             >
//                                 Send
//                             </button>
//                         </form>
//                     )}
//                     <div className="mt-6">
//                         <CodeBlocks code={selectedOption?.curl_url} language="curl_api" showLineNumbers={true} />
//                     </div>
//                 </div>
//                 <div className="w-full md:w-1/2 mt-8 md:mt-0">
//                     <h2 className="text-2xl font-bold mb-4">Response</h2>
//                     <div className="border-2 border-gray-300 rounded-lg min-h-[200px] w-full p-4 bg-white overflow-x-auto">
//                         {response ? (
//                             renderTable(
//                                 Object.fromEntries(
//                                     Object.entries(response).filter(
//                                         ([key]) =>
//                                             key !== 'message' &&
//                                             key !== 'responseId' &&
//                                             key !== 'status' &&
//                                             key !== 'response_id'
//                                     )
//                                 )
//                             )
//                         ) : (
//                             <span className="underline">Response data will be shown here:</span>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default DashBoard;


import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import CodeBlocks from "../components/CodeBlock";

const DashBoard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [response, setResponse] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const options = [
    {
      value: "1",
      label: "Vehicle RC V2 API",
      url: "/api/rc/v2",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "0iFX0CHjYL6gm3zZ7eeyd89LYBOPrUHq6QiqvpEv",
      },
      body: { vehicle_number: "text" },
      curl_url: 
        `curl --location 'https://dev-api.innowave.solutions/rc/v2' \
        --header 'x-api-key: <api-key>' \
        --header 'Content-Type: application/json' \ 
        --data '{
        "vehicle_number": "vehicle_number_value"
        }'`,
    },
    {
      value: "2",
      label: "Fastag API",
      url: "/api/rc/fastag-details",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "0iFX0CHjYL6gm3zZ7eeyd89LYBOPrUHq6QiqvpEv",
      },
      body: { vehicle_number: "text" },
      curl_url:
        `curl --location 'https://dev-api.innowave.solutions/rc/fastag-details' \
        --header 'Content-Type: application/json' \
        --header 'x-api-key: <api-key>' \
        --data '{
        "vehicle_number": "vehicle_number_value"
        }'`,
        },
    {
      value: "3",
      label: "Challan API",
      url: "/api/rc/challan-details",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "0iFX0CHjYL6gm3zZ7eeyd89LYBOPrUHq6QiqvpEv",
      },
      body: { vehicle_number: "text" },
      curl_url: 
        `curl --location 'https://dev-api.innowave.solutions/rc/challan-details' \
        --header 'Content-Type: application/json' \
        --header 'x-api-key: <apikey>' \
        --data '{
        "vehicle_number": "vehicle_number_value"
        }'`,
    },
  ];

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

  const handleChange = (option) => {
    reset();
    setSelectedOption(option);
  };

  const handleButtonClick = () => {
    if (selectedOption) {
      console.log("Button clicked for option:", selectedOption);
    }
  };

  const onSubmit = async (data) => {
    const result = await axios.post(selectedOption.url, data, {
      headers: selectedOption.headers,
    });
    setResponse(
      Object.keys(result.data).includes("result")
        ? result.data.result[0]
        : result.data
    );
  };

  //     const renderTable = (data,level=0) => { ... }

  const renderTable = (data, level = 0) => {
    if (typeof data !== "object" || data === null) {
      return <span className="text-gray-800">{String(data)}</span>;
    }

    if (Array.isArray(data)) {
      return (
        <div className={`overflow-x-auto ml-${level * 2}`}>
          <table className="min-w-full border border-slate-200 rounded-lg shadow-sm bg-gradient-to-br from-white to-slate-50">
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="even:bg-slate-50 odd:bg-white">
                  <td className="border px-4 py-3 text-sm">
                    {renderTable(item, level + 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className={`overflow-x-auto ml-${level * 2}`}>
        <table className="min-w-full border border-slate-200 rounded-lg shadow-md bg-gradient-to-br from-white to-slate-50">
          <tbody>
            {Object.entries(data).map(([key, value], idx) => (
              <tr
                key={key}
                className={`transition hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                }`}
              >
                <th
                  className={`border px-4 py-3 text-left align-top font-bold text-blue-700 whitespace-nowrap ${
                    level === 0 ? "bg-blue-100" : "bg-slate-100"
                  }`}
                  style={{ minWidth: 120 }}
                >
                  {key.split("_").join(" ").toUpperCase()}
                </th>
                <td className="border px-4 py-3 text-gray-900 align-top">
                  {renderTable(value, level + 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {/* Branding Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Veriqos API Hub
          </h1>
          <span className="text-sm md:text-base opacity-90">
            Powering Smart Data • Fast • Secure
          </span>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* API Interaction Section */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              API Playground
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
                  primary: "#2563EB",
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
                  className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 transition w-full md:w-auto"
                  onClick={handleButtonClick}
                >
                  🚀 Send Request
                </button>
              </form>
            )}
            <div className="mt-6">
              <CodeBlocks
                code={selectedOption?.curl_url}
                language="curl_api"
                showLineNumbers={true}
              />
            </div>
          </div>

          {/* Response Section */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
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
        </div>

        {/* Marketing Section */}
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
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
    </>
  );
};

export default DashBoard;