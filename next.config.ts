import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
		{
			protocol: "https",
			hostname: "raw.communitydragon.org",
		},
		{
			protocol: "https",
			hostname: "ddragon.leagueoflegends.com",
		},
    ]
  },
};

export default nextConfig;
