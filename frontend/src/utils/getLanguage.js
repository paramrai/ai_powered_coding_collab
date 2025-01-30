export const getLanguage = (filename) => {
  const extension = filename?.split(".").pop().toLowerCase();
  const languageMap = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
    php: "php",
    rb: "ruby",
    rs: "rust",
    go: "go",
    sql: "sql",
  };
  return languageMap[extension] || "plaintext";
};
