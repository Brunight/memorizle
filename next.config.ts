import type { NextConfig } from "next";
import PWA from "next-pwa";

const withPWA = PWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  sw: "sw.js",
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
// @ts-ignore
export default withPWA(nextConfig);
