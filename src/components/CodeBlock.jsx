import { useEffect, useState } from "react";
import { CodeTabs } from "./ui/shadcn-io/code-tabs";
export default function CodeBlocks({ code }) {
  const [mycode, setMycode] = useState(code);
  useEffect(() => {
    setMycode(code);
  }, [code]);
  return mycode ? (
    <CodeTabs lang="bash" codes={mycode} themes={"github-dark"} />
  ) : (
    ""
  );
}
