import fs from "fs";
import path from "path";

export default function reactInlineEditor() {
  return {
    name: "vite-plugin-react-inline-editor",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith(".jsx") || id.endsWith(".tsx")) {
        // Verifica se o arquivo tem marcação de edição inline
        if (code.includes("data-inline-editor")) {
          const editorScriptPath = path.resolve(
            __dirname,
            "./edit-mode-script.js"
          );
          const editorScript = fs.readFileSync(editorScriptPath, "utf-8");

          return {
            code: `
              ${code}
              if (typeof window !== "undefined") {
                const script = document.createElement("script");
                script.type = "module";
                script.innerHTML = \`${editorScript}\`;
                document.body.appendChild(script);
              }
            `,
            map: null,
          };
        }
      }
      return null;
    },
  };
}
