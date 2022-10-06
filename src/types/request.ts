export interface FormatResponse {
    code: number,
    msg?: string,
    data?: any
}

export interface ConfigRequest {
    headers?: any,
    error?: any
}

export interface ConfigResponse {
    data?: any,
    error?: any
}

export interface ErrorConfigResponse {
    data?: {
        code: number,
        message: string
    },
    response: {
        status: number,
        message: string,
        data?: {
            message: string,
            error: string
        }
    }
}