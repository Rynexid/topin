import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url().default("http://localhost:5173/api"),
    VITE_APP_NAME: z.string().default("TOPIN"),
  },
  runtimeEnv: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  } as Record<string, string | undefined>,
  emptyStringAsUndefined: true,
});
