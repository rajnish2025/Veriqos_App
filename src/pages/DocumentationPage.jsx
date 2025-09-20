import React, { useState } from "react";
import apiDocumentation from "../../devdocsData.json";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
const SectionBlock = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-[#043758] mb-2">{title}</h2>
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
      {children}
    </div>
  </div>
);

const DocumentationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const docsData = apiDocumentation.find((api) => api.id == id);
  if (!docsData) {
    return <div className="p-8 text-red-500">API not found</div>;
  }

  const sidebarLinks = [
    { id: "overview", label: "Overview" },
    { id: "endpoint", label: "Endpoint" },
    { id: "request", label: "Request" },
    { id: "response", label: "Response" },
    { id: "status-codes", label: "Status Codes" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#043758] relative top-40">
      <div className="md:hidden px-4 py-2 border-b flex justify-between items-center bg-white fixed top-0 left-0 w-full z-20">
        <h2 className="font-semibold text-[#043758]">{docsData.name}</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu size={20} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[3.5rem] left-0 w-full bg-white border-b z-10 px-4 py-4">
          <ul className="space-y-2 text-sm">
            {sidebarLinks.map((link) => (
              <li
                key={link.id}
                className={`p-5 size-4 rounded-sm ${
                  activeLink === link.id ? "bg-[#043758]" : "hover:bg-[#043758]"
                } `}
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveLink(link.id);
                  }}
                  className={`block text-gray-700 ${
                    activeLink === link.id ? "text-white" : "hover:text-white"
                  } active:bg-[#043758]`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex">
        <aside className="w-64 border-r border-gray-200 sticky top-40 h-[calc(100vh-10rem)] p-6 hidden md:block">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Document Sections
          </h2>
          <ul className="space-y-2 text-sm">
            {sidebarLinks.map((link) => (
              <li
                key={link.id}
                className={`p-3 text-md ${
                  activeLink === link.id ? "bg-[#043758]" : "hover:bg-[#043758]"
                } hover:text-white rounded-sm`}
              >
                <a
                  href={`#${link.id}`}
                  className={`${
                    activeLink === link.id ? "text-white" : "hover:text-white"
                  } active:bg-[#043758]`}
                  onClick={() => setActiveLink(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 px-4 md:px-8 py-10 max-w-4xl mx-auto w-full">
          <button
            onClick={() => navigate("/devdocs")}
            className="flex items-center mb-6 text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to API List
          </button>

          <h1 className="text-3xl font-bold text-[#043758] mb-2">
            {docsData.name}
          </h1>
          <p className="text-gray-600 mb-8">{docsData.overview}</p>

          <div id="overview" className="scroll-mt-40">
            <SectionBlock title="Overview">
              <p className="text-sm text-gray-700">{docsData.overview}</p>
            </SectionBlock>
          </div>

          <div id="endpoint" className="scroll-mt-40">
            <SectionBlock title="Endpoint">
              <CodeBlock text={docsData.endpoint} />
            </SectionBlock>
          </div>

          <div id="request" className="scroll-mt-40">
            <SectionBlock title="curl Example">
              <CodeBlock text={docsData.request} />
            </SectionBlock>
          </div>

          <div id="response" className="scroll-mt-40">
            <SectionBlock title="Response Example">
              <CodeBlock text={docsData.response} />
            </SectionBlock>
          </div>

          <div id="status-codes" className="scroll-mt-40">
            <SectionBlock title="Status Codes">
              <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
                <thead className="bg-gray-100 text-[#043758]">
                  <tr>
                    <th className="px-4 py-2 border-b">Code</th>
                    <th className="px-4 py-2 border-b">Description</th>
                    <th className="px-4 py-2 border-b">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {docsData.statusCodes?.map((status, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border-b">{status.code}</td>
                      <td className="px-4 py-2 border-b">
                        {status.description}
                      </td>
                      <td className="px-4 py-2 border-b text-gray-500">
                        {status.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionBlock>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationPage;
