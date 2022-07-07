export interface UserPayload {
    sub: number;
    name: string;
    email: string;
    iat?: number; // é acessável do payload
    exp?: number;
}