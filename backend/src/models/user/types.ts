// Auth

export type SignUpInput = {
    email: string;
    name: string;
    password: string;
};

// Users

export type GetUserByIdInput = {
    userId: number;
}