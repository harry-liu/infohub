"use server";

import { getCollection } from "./mongoDB";
import { TrendingProject } from "../types";

function getTodayTimestamp(): string {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Get only the date part
}

export async function SaveTrendingProjects(projects: TrendingProject[]) {
  const timestamp = getTodayTimestamp();
  const projectsWithDate = {
    timestamp,
    projects,
  };
  const projectsCollection = await getCollection("trendingProjects");
  const result = await projectsCollection.updateOne(
    { timestamp },
    { $set: projectsWithDate },
    { upsert: true }
  );
  return result;
}

export async function GetTrendingProjects() {
  const timestamp = getTodayTimestamp();
  const projectsCollection = await getCollection("trendingProjects");
  const projects = await projectsCollection.find({ timestamp }).toArray();
  return projects[0]?.projects;
}
