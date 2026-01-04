import { AuthStatus, UserRole } from "./auth.entity";

export interface IAuthFormData {
    id?: string;        // present only in edit mode
    username: string;
    email: string;
    password?: string; // present only in create mode
    role: UserRole;
    status: AuthStatus;
}

export interface IUpdateAuth {
    username?: string;
    email?: string;
    role?: UserRole;
    status?: AuthStatus;
    isVerified?: boolean;
}

export interface IRegisterData {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
    status?: AuthStatus;
    agreeToTerms?: boolean;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IChangePassword {
    password: string;
}

export interface IResetPassword {
    email: string;
    password: string;
}

export interface IAuthUser {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    status: AuthStatus;
    isVerified: boolean;
}

export interface IAuthDashboard {
    id: string;
    username: string;        // UNIQUE, login identifier
    email: string;
    role: UserRole;
    status: AuthStatus;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

