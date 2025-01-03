"use client";

import { News as NewsType } from "@/lib/types";
import { Suspense, useEffect, useState } from "react";

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 50000
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function getNews(): Promise<NewsType[]> {
  const res = await fetchWithTimeout("http://localhost:3000/api/news");
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }
  return res.json();
}

function NewsList() {
  const [news, setNews] = useState<NewsType[]>([]);
  useEffect(() => {
    const fetchNews = async () => {
      const news = await getNews();
      setNews(news);
    };
    fetchNews();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {news.map((newsItem: NewsType) => (
        <div
          key={newsItem.url}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
            <h3 className="font-bold text-lg">{newsItem.title}</h3>
            <p className="text-gray-600">{newsItem.summary}</p>
            <p className="text-gray-600">{newsItem.source}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function News() {
  return (
    <div className="p-6">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">News</h1>
        <Suspense fallback={<div>Loading news...</div>}>
          <NewsList />
        </Suspense>
      </main>
    </div>
  );
}
