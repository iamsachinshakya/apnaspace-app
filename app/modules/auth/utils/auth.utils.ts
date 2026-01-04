import { IAuthFormData } from "@/app/modules/auth/types/auth.dto";
import { AuthStatus, IAuthEntity, UserRole } from "@/app/modules/auth/types/auth.entity";

export const getEmptyAuthFormData = (): IAuthFormData => ({
    username: "",
    email: "",
    password: "",
    role: UserRole.USER,
    status: AuthStatus.ACTIVE,
});

export const getParsedAuthFormData = (user: IAuthEntity): IAuthFormData => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
    };
};