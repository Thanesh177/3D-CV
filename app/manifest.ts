import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thanesh Nagarajan — Cloud Engineer",
    short_name: "Thanesh",
    description: "Secure cloud architecture, automation and full-stack systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f5f1",
    theme_color: "#f6f5f1",
  };
}
