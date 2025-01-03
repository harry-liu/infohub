"use server";

import { getCollection } from "./mongoDB";
import { News } from "../types";
import { getTodayTimestamp } from "../utils";

export async function SaveNews(news: News[]) {
  const newsCollection = await getCollection("news");
  const timestamp = getTodayTimestamp();
  news.forEach((newsItem) => {
    newsItem.date = timestamp;
  });
  news.forEach(async (newsItem) => {
    await newsCollection.updateOne(
      { url: newsItem.url },
      { $set: newsItem },
      { upsert: true }
    );
  });

  return "success";
}

export async function GetNews() {
  const timestamp = getTodayTimestamp();
  const newsCollection = await getCollection("news");
  const newsWithTimestamp = await newsCollection.find({ data: timestamp });
  return newsWithTimestamp;
}
