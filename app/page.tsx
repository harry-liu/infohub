import { Suspense } from "react";
import { TrendingProject } from "@/lib/types";

async function getTrendingProjects(): Promise<TrendingProject[]> {
  const res = await fetch("http://localhost:3000/api/github-trending");
  if (!res.ok) throw new Error("Failed to fetch trending projects");
  return res.json();
}

async function TrendingProjects() {
  const projects = await getTrendingProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {projects.map((project: TrendingProject) => (
        <div
          key={project.url}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-gray-600">{project.customDescription}</p>
            <div className="mt-2 flex items-center gap-4">
              <span>⭐ {project.stars}</span>
              <span>{project.language}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="p-6">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">GitHub Trending Projects</h1>
        <Suspense fallback={<div>Loading trending projects...</div>}>
          <TrendingProjects />
        </Suspense>
      </main>
    </div>
  );
}
