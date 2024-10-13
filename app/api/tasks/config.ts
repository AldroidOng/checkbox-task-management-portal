import { baseConfig } from "@/config";

export const userApiConfig = {
  ...baseConfig,
  baseUrl: process.env.USER_API_BASE_URL || baseConfig.baseUrl,
  timeout: 3000,
};
