import { Check, CopyIcon } from "lucide-react";
import { useState } from "react";

const CodeBlock = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      typeof text === "object" ? JSON.stringify(text, null, 2) : text
    );
    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-gray-200 hover:text-white transition"
        aria-label="Copy to clipboard"
      >
        {!copied ? <CopyIcon size={16} /> : <Check size={16} />}
      </button>
      <pre className="bg-[#043758] text-white p-4 rounded-md text-sm overflow-x-auto pt-8">
        {typeof text === "object" ? JSON.stringify(text, null, 2) : text}
      </pre>
    </div>
  );
};

export default CodeBlock;
