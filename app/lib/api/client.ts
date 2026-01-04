import axios from "axios";
import { createApiClient } from "./createApiClient";

/* ----------------------------------------------------
   API Gateway URL (single entry point)
---------------------------------------------------- */
export const SERVICE_URLS = {
    API_GATEWAY:
        process.env.NEXT_PUBLIC_API_GATEWAY_URL ??
        "http://localhost:5000/api/v1",
} as const;

/* ----------------------------------------------------
   Core Auth Infrastructure Client
   (NO interceptors, NO prefix)
   → Used ONLY internally for:
     - refresh-token
   ⚠️ DO NOT use directly in services
---------------------------------------------------- */
export const authClient = axios.create({
    baseURL: SERVICE_URLS.API_GATEWAY,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

/* ----------------------------------------------------
   Auth API Client (Gateway + /auth prefix)
   → Used by authService for ALL auth routes:
     - login
     - logout
     - register
     - reset-password
     - auth users (admin)
---------------------------------------------------- */
export const authApiClient = createApiClient(SERVICE_URLS.API_GATEWAY, {
    refreshClient: authClient,
    prefix: "/auth",
});

/* ----------------------------------------------------
   Domain API Clients
   (Gateway + Prefix Routing + Token Refresh)
---------------------------------------------------- */
export const userClient = createApiClient(SERVICE_URLS.API_GATEWAY, {
    refreshClient: authClient,
    prefix: "/users",
});

export const categoryClient = createApiClient(SERVICE_URLS.API_GATEWAY, {
    refreshClient: authClient,
    prefix: "/categories",
});

export const blogClient = createApiClient(SERVICE_URLS.API_GATEWAY, {
    refreshClient: authClient,
    prefix: "/blogs",
});
