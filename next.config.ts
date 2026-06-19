import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
// 1. Añadimos una variable para saber si estamos usando un dominio propio
const hasCustomDomain = true; // Al ponerlo en true, desactivamos el prefijo del repositorio

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";

// 2. Modificamos la lógica: si tiene un dominio propio, el basePath DEBE ser vacío ("")
const basePath = process.env.BASE_PATH || (isGitHubPages && repositoryName && !hasCustomDomain ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages && basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
