import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";

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
   Factory: Create API Client
---------------------------------------------------- */
export const createApiClient = (
    baseURL: string,
    options?: {
        refreshClient?: AxiosInstance;
    }
): AxiosInstance => {
    const apiClient = axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
        withCredentials: true,
    });

    /* ----------------------------------------------------
       Token Refresh State (per client)
    ---------------------------------------------------- */
    let isRefreshing = false;
    let failedQueue: any[] = [];

    const processQueue = (error: any) => {
        failedQueue.forEach(({ resolve, reject }) => {
            if (error) reject(error);
            else resolve(true);
        });
        failedQueue = [];
    };

    /* ----------------------------------------------------
       REQUEST INTERCEPTOR
    ---------------------------------------------------- */
    apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const startTime = Date.now();

            (config as any).metadata = { startTime };

            console.log(
                `📤 API REQUEST → [${config.method?.toUpperCase()}] ${config.url}`,
                {
                    baseURL: config.baseURL,
                    params: config.params,
                    data: safeStringify(config.data),
                    headers: config.headers,
                }
            );

            return config;
        },
        (error) => {
            console.error("❌ API REQUEST ERROR (before sending)", error);
            return Promise.reject(error);
        }
    );

    /* ----------------------------------------------------
       RESPONSE INTERCEPTOR
    ---------------------------------------------------- */
    apiClient.interceptors.response.use(
        (response) => {
            const metadata = (response.config as any).metadata;
            const duration = metadata ? Date.now() - metadata.startTime : null;

            console.log(
                `✅ API RESPONSE ← [${response.status}] ${response.config.url}`,
                {
                    duration: duration ? `${duration}ms` : null,
                    data: response.data,
                }
            );

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
               Access Token Expired → Refresh
            ---------------------------------------------------- */
            if (
                errorCode === "ACCESS_TOKEN_EXPIRED" &&
                !originalRequest._retry &&
                options?.refreshClient
            ) {
                originalRequest._retry = true;

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(() => apiClient(originalRequest));
                }

                isRefreshing = true;

                try {
                    await options.refreshClient.post("/auth/refresh-token");

                    isRefreshing = false;
                    processQueue(null);

                    return apiClient(originalRequest);
                } catch (refreshError) {
                    isRefreshing = false;
                    processQueue(refreshError);
                    return Promise.reject(refreshError);
                }
            }

            /* ----------------------------------------------------
               Invalid Refresh Token → Logout
            ---------------------------------------------------- */
            if (
                errorCode === "REFRESH_TOKEN_MISSING" ||
                errorCode === "REFRESH_TOKEN_MISMATCH" ||
                errorCode === "TOKEN_INVALID"
            ) {
                console.warn("⛔ Invalid refresh token → forcing logout");
                // window.location.href = "/login";
            }

            return Promise.reject(error);
        }
    );

    return apiClient;
};
