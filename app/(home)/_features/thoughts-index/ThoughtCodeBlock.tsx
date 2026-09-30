import { codeToHtml, type BundledLanguage } from "shiki";

const languages: Record<string, BundledLanguage> = {
  http: "http",
  ts: "ts",
  tsx: "tsx",
  typescript: "ts",
};

export async function ThoughtCodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const html = (
    await codeToHtml(code.replace(/\n$/, ""), {
      lang: languages[language] ?? "ts",
      theme: "one-dark-pro",
    })
  ).replace(/>\n</g, "><");

  return (
    <div
      className="thoughtCode"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
