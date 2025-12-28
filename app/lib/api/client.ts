import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
    withCredentials: true,
});

/* ----------------------------------------------------
   Helper: Safe JSON stringify
---------------------------------------------------- */
const safeStringify = (data: any) => {
    try {
        return JSON.stringify(data);
    } catch {
        return "Unserializable Payload";
    }
};

/* ----------------------------------------------------
   Track Refresh Logic
---------------------------------------------------- */
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) promise.reject(error);
        else promise.resolve(token);
    });
    failedQueue = [];
};

/* ----------------------------------------------------
   REQUEST INTERCEPTOR WITH LOGGING
---------------------------------------------------- */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const requestId = Date.now();

        (config as any).metadata = { startTime: requestId };

        console.log(`📤 API REQUEST → [${config.method?.toUpperCase()}] ${config.url}`, {
            requestId,
            baseURL: config.baseURL,
            params: config.params,
            data: safeStringify(config.data),
            headers: config.headers,
        });

        return config;
    },
    (error) => {
        console.error("❌ API REQUEST ERROR (before sending)", error);
        return Promise.reject(error);
    }
);

/* ----------------------------------------------------
   RESPONSE INTERCEPTOR WITH LOGGING
---------------------------------------------------- */
apiClient.interceptors.response.use(
    (response) => {
        const metadata = (response.config as any).metadata;
        const duration = metadata ? Date.now() - metadata.startTime : null;

        console.log(`✅ API RESPONSE ← [${response.status}] ${response.config.url}`, {
            duration: duration ? `${duration}ms` : null,
            data: response.data,
        });

        return response;
    },

    async (error: AxiosError<any>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
            metadata?: any;
        };

        const duration = originalRequest?.metadata
            ? Date.now() - originalRequest.metadata.startTime
            : null;

        const errorCode = error.response?.data?.errorCode;

        console.error(`🔥 API ERROR ← ${originalRequest?.url}`, {
            status: error.response?.status,
            errorCode,
            message: error.message,
            data: error.response?.data,
            duration: duration ? `${duration}ms` : null,
        });

        /* ----------------------------------------------------
           Case: Access Token Expired → Refresh
        ---------------------------------------------------- */
        if (errorCode === "ACCESS_TOKEN_EXPIRED" && !originalRequest._retry) {
            console.warn("🔄 Access token expired → triggering refresh...");

            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => apiClient(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            try {
                await apiClient.post("/auth/refresh-token", {}, { withCredentials: true });

                console.log("🔁 Token refreshed. Retrying request:", originalRequest.url);

                isRefreshing = false;
                processQueue(null);

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error("❌ Failed to refresh token", refreshError);

                isRefreshing = false;
                processQueue(refreshError, null);

                return Promise.reject(refreshError);
            }
        }

        /* ----------------------------------------------------
           Case: Refresh Token Failed → Logout
        ---------------------------------------------------- */
        if (
            errorCode === "REFRESH_TOKEN_MISSING" ||
            errorCode === "REFRESH_TOKEN_MISMATCH" ||
            errorCode === "TOKEN_INVALID"
        ) {
            console.warn("⛔ Invalid refresh token → forcing logout");
            // Optionally redirect:
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
