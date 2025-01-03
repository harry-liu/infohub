import { GetNews } from "@/lib/db/news";
import puppeteer from "puppeteer";

export const revalidate = 60;

export async function GET() {
  try {
    const existingNews = await GetNews();
    if (existingNews) {
      return Response.json(existingNews);
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://cn.investing.com/news/latest-news");

    const news = await page.evaluate(() => {
      const newsElements = document.querySelectorAll(
        'article[data-test="article-item"]'
      );
      return Array.from(newsElements).map((newsElement) => {
        const titleElement = newsElement.querySelector("div a");
        const descriptionElement = newsElement.querySelector("div p");

        return {
          title: titleElement?.textContent,
          summary: descriptionElement?.textContent,
          url: (titleElement as HTMLAnchorElement)?.href,
          source: "Investing CN",
        };
      });
    });
    await browser.close();

    // SaveNews(news);

    return Response.json(news);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
