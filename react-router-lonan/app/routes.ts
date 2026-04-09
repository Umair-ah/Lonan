import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
  route("services", "routes/service.tsx"),
  route("services/:slug", "routes/service.$slug.tsx"),
  route("blog/:slug", "routes/post.tsx"),
] satisfies RouteConfig;
