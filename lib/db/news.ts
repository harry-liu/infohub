"use server";

import { getCollection } from "./mongoDB";
import { News } from "../types";
import { getTodayTimestamp } from "../utils";

export async function SaveNews(news: News[]) {
  const timestamp = getTodayTimestamp();
  const newsWithDate = {
    timestamp,
    news,
  };
  const newsCollection = await getCollection("news");
  const result = await newsCollection.updateOne(
    { timestamp },
    { $set: newsWithDate },
    { upsert: true }
  );
  return result;
}

export async function GetNews() {
  const timestamp = getTodayTimestamp();
  const newsCollection = await getCollection("news");
  const newsWithTimestamp = await newsCollection.findOne({ timestamp });
  return newsWithTimestamp?.news;
}
