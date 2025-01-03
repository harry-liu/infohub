"use server";

import { getCollection } from "./mongoDB";
import { TrendingProject } from "../types";
import { getTodayTimestamp } from "../utils";

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
  const projects = await projectsCollection.findOne({ timestamp });
  return projects?.projects;
}
