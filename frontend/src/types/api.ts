export interface ApiResponse<T> {
    data: T;
    meta?: {
        page: number;
        perPage: number;
        total: number;
    };
    message?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    perPage: number;
}
