import { baseConfig } from "@/config";

export const apiConfig = {
  ...baseConfig,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || baseConfig.apiBaseUrl,
  timeout: 3000,
};
