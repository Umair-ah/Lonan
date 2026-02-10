import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("services/:slug", "routes/service.tsx"),
  route("blog/:slug", "routes/post.tsx"),
] satisfies RouteConfig;
