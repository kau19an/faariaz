import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Check, Copy, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";

const customTheme: any = {
  'code[class*="language-"]': {
    color: "#d4d4d4",
    textShadow: "none",
    fontFamily:
      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
    fontSize: "0.9rem",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    tabSize: "4",
    hyphens: "none",
    background: "transparent",
  },
  'pre[class*="language-"]': {
    color: "#d4d4d4",
    textShadow: "none",
    fontFamily:
      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
    fontSize: "0.9rem",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    tabSize: "4",
    hyphens: "none",
    background: "transparent",
    margin: 0,
    padding: 0,
    overflow: "auto",
  },
  comment: { color: "#6a9955" },
  punctuation: { color: "#d4d4d4" },
  property: { color: "#9cdcfe" },
  tag: { color: "#569cd6" },
  boolean: { color: "#569cd6" },
  number: { color: "#b5cea8" },
  constant: { color: "#9cdcfe" },
  symbol: { color: "#b5cea8" },
  selector: { color: "#d7ba7d" },
  "attr-name": { color: "#9cdcfe" },
  string: { color: "#ce9178" },
  char: { color: "#ce9178" },
  builtin: { color: "#569cd6" },
  inserted: { color: "#b5cea8" },
  operator: { color: "#d4d4d4" },
  entity: { color: "#569cd6", cursor: "help" },
  url: { color: "#9cdcfe" },
  keyword: { color: "#569cd6" },
  function: { color: "#dcdcaa" },
  "class-name": { color: "#4ec9b0" },
  regex: { color: "#d16969" },
  variable: { color: "#9cdcfe" },
};

export default function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: any) {
  const [isCopied, setIsCopied] = useState(false);

  const codeString = String(children).replace(/\n$/, "");
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";

  const isActuallyInline =
    inline || (className === undefined && !codeString.includes("\n"));

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeString);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = codeString;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Error when copying:", err);
    }
  };

  if (isActuallyInline) {
    return (
      <code
        className="bg-gray-200 text-red-600 px-1.5 py-0.5 rounded-md font-mono text-sm border border-gray-300 align-middle"
        {...props}
      >
        {children}
      </code>
    );
  }

  const { t } = useTranslation();

  return (
    <div className="relative group mb-4 rounded-xl overflow-hidden border border-gray-700/50 bg-[#1e1e1e] shadow-md font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700/50 text-xs text-gray-400 select-none">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-gray-500" />
          <span className="font-medium">{language.toLowerCase()}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none"
        >
          {isCopied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400 font-medium">{t('ui.copied')}</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>{t('button.copy')}</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          showLineNumbers={false}
          wrapLongLines={true}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            backgroundColor: "transparent",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
