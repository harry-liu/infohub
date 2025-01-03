import { SaveNews } from "@/lib/db/news";
import { News } from "@/lib/types";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://cn.investing.com/news/latest-news");
    let news: News[] = [];

    try {
      news = await page.evaluate(() => {
        const newsElements = document.querySelectorAll(
          'article[data-test="article-item"]'
        );

        return Array.from(newsElements).map((newsElement) => {
          const titleElement = newsElement.querySelector("div a");
          const descriptionElement = newsElement.querySelector("div p");

          return {
            title: titleElement?.textContent || "",
            summary: descriptionElement?.textContent || "",
            url: (titleElement as HTMLAnchorElement)?.href,
            source: "Investing CN",
            date: "",
          };
        });
      });

      SaveNews(news as News[]);
    } catch (error) {
      console.log("error", error);
    } finally {
      await browser.close();
    }

    return Response.json(news);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
