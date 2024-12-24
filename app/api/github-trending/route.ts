import puppeteer from "puppeteer";
import { translate } from "@vitalets/google-translate-api";

export const revalidate = 60;

export async function GET() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://github.com/trending");

    const repositories = await page.evaluate(() => {
      const repos = document.querySelectorAll("article.Box-row");
      return Array.from(repos).map((repo) => {
        const titleElement = repo.querySelector("h2 a");
        const descriptionElement = repo.querySelector("p");
        const statsElement = repo.querySelector("div.f6.color-fg-muted.mt-2");
        const languageElement = statsElement?.querySelector(
          '[itemprop="programmingLanguage"]'
        );
        const languageColorElement = statsElement?.querySelector(
          ".repo-language-color"
        );

        const fullName = titleElement?.getAttribute("href")?.slice(1) || "";
        const [owner, name] = fullName.split("/");

        // Parse numbers from strings and remove commas
        const starsText =
          statsElement?.querySelector("a")?.textContent?.trim() || "0";
        const forksText =
          statsElement?.querySelectorAll("a")[1]?.textContent?.trim() || "0";
        const todayStarsText =
          repo
            .querySelector("span.d-inline-block.float-sm-right")
            ?.textContent?.trim() || "0";

        return {
          name,
          owner,
          fullName,
          description: descriptionElement?.textContent?.trim() || "",
          url: `https://github.com/${fullName}`,
          language: languageElement?.textContent?.trim() || "",
          languageColor:
            languageColorElement
              ?.getAttribute("style")
              ?.match(/background-color: (.+?);/)?.[1] || "",
          stars: parseInt(starsText.replace(/,/g, "")) || 0,
          forks: parseInt(forksText.replace(/,/g, "")) || 0,
          starsToday: parseInt(todayStarsText.replace(/,/g, "")) || 0,
          avatar: `https://github.com/${owner}.png`,
        };
      });
    });

    // Translate descriptions to Chinese
    const translatedRepos = await Promise.all(
      repositories.map(async (repo) => {
        try {
          const { text } = await translate(repo.description, { to: "zh-CN" });
          return {
            ...repo,
            description: text,
          };
        } catch (error) {
          console.error(`Translation failed for ${repo.fullName}:`, error);
          return repo;
        }
      })
    );

    await browser.close();
    return Response.json(translatedRepos);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
