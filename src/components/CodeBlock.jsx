// import React from 'react'
// import { CopyBlock,dracula  } from 'react-code-blocks';
// const CodeBlocks = ({ code, language, showLineNumbers }) => {
//   return (
//     <div style={{ borderRadius: "8px", overflow: "hidden" }}>
//       <div style={{ background: "#1e1e1e", padding: "6px 12px", color: "#fff", fontSize: "14px" }}>
//         curl
//       </div>
//       <CopyBlock
//         text={code ? code : 'curl --https://example.com'}
//         language={language}
//         showLineNumbers={showLineNumbers}
//         theme={dracula}
//         wrapLongLines
//         codeBlock
//       />
//     </div>

//   )
// }

// export default CodeBlocks;

import { useEffect, useState } from "react";
import { CodeTabs } from "./ui/shadcn-io/code-tabs";
const CODES = {
  Curl: `{
  curl --location 'https://dev-api.innowave.solutions/rc/v2' \n\
--header 'x-api-key: 0iFX0CHjYL6gm3zZ7eeyd89LYBOPrUHq6QiqvpEv' \n\
--header 'Content-Type: application/json' \n\
--data '{
    "vehicle_number": "UP53EB7078"
    }'
}`,
  JavaScript: `{
  import axios from "axios";
  const response = await axios.post("https://dev-api.innowave.solutions/rc/fastag-details",
    {vehicle_number: "vehicle_number_value",},
    {headers: {"x-api-key": "<api-key>","Content-Type": "application/json",},
  }
);
}`,
};
export default function CodeBlocks({ code, language }) {
  const [mycode, setMycode] = useState(code);
  useEffect(() => {
    setMycode(code);
  }, [code]);
  console.log(code);
  return <CodeTabs lang="json" codes={code} themes={{ dark: "github-dark" }} />;
}
