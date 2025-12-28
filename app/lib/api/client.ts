import axios from "axios";
import { createApiClient } from "./createApiClient";

/* ----------------------------------------------------
   Service URLs (Next.js public env vars)
---------------------------------------------------- */
export const SERVICE_URLS = {
    API_GATEWAY:
        process.env.NEXT_PUBLIC_API_GATEWAY_URL ??
        "https://apnaspace-gateway-service.vercel.app",
    AUTH:
        process.env.NEXT_PUBLIC_AUTH_API_URL ??
        "http://localhost:5001/api/v1",

    USER:
        process.env.NEXT_PUBLIC_USER_API_URL ??
        "http://localhost:5002/api/v1",

    CATEGORY:
        process.env.NEXT_PUBLIC_CATEGORY_API_URL ??
        "http://localhost:5003/api/v1",

    BLOG:
        process.env.NEXT_PUBLIC_BLOG_API_URL ??
        "http://localhost:5004/api/v1",
} as const;


/* ----------------------------------------------------
   Auth Client (NO refresh loop)
---------------------------------------------------- */
export const authClient = axios.create({
    baseURL: SERVICE_URLS.API_GATEWAY,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

/* ----------------------------------------------------
   API Clients (Refresh handled via authClient)
---------------------------------------------------- */
export const userClient = createApiClient(SERVICE_URLS.API_GATEWAY, {
    refreshClient: authClient,
});

export const categoryClient = createApiClient(SERVICE_URLS.API_GATEWAY, {
    refreshClient: authClient,
});

export const blogClient = createApiClient(SERVICE_URLS.API_GATEWAY, {
    refreshClient: authClient,
});
