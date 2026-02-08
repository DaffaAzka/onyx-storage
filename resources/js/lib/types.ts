export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};

export type Category = {
    id: number;
    name: string;
    description: string;
    user?: User;
    created_at: Date;
    updated_at: Date;
};

export type Item = {
    id: number;
    category_id: number;
    user_id: number;
    name: string;
    code: string;
    description: string | null;
    status: 'fair' | 'damaged' | 'good';
    quantity: number;
    evailable_quantity: number;
    image_path: string | null;
    category?: Category;
    user?: User;
    created_at: Date;
    updated_at: Date;
};

export type SelectItems = {
    id: string | number;
    name: string;
};

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export enum Actions {
    UPDATE = 'UPDATE',
    DETAIL = 'DETAIL',
    DELETE = 'DELETE',
}
