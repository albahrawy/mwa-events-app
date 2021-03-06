export interface IUserCredential {
    email: string;
    password: string;
}

export interface IResponseResult {
    success: boolean;
    message?: string;
}