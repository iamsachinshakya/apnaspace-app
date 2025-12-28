export interface ApiResponse<T = any, M = any, E = any> {
    readonly success: boolean;
    readonly message: string;
    readonly data?: T;
    readonly statusCode: number;
    readonly meta?: M;
    readonly errors?: E;
}

/**
 * Standardized success response DTO
 */
export const handleSuccessDTO = <T, M = any>(
    data: T,
    message = "Success",
    statusCode = 200,
    meta?: M
): ApiResponse<T, M> => ({
    success: true,
    message,
    data,
    statusCode,
    meta,
});

/**
 * Standardized handled error response DTO
 */
export const handleErrorDTO = <E = any, M = any>(
    message: string,
    statusCode = 400,
    errors?: E,
    meta?: M
): ApiResponse<null, M, E> => ({
    success: false,
    message,
    data: null,
    statusCode,
    errors,
    meta,
});

/**
 * Standardized unhandled/fallback error response DTO
 */
export const unhandledErrorDTO = <E = any>(
    message = "Something went wrong",
    errors?: E
): ApiResponse<null, undefined, E> => ({
    success: false,
    message,
    data: null,
    statusCode: 500,
    errors,
});

/**
 * Union type of all possible API response DTOs
 */
export type HandleResponseDTO<T = any, M = any, E = any> =
    | ReturnType<typeof handleSuccessDTO<T, M>>
    | ReturnType<typeof handleErrorDTO<E, M>>
    | ReturnType<typeof unhandledErrorDTO<E>>;
