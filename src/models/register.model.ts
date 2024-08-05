import { Photo } from "@capacitor/camera";

export interface RegisterUserForm {
    name: string | undefined |null;
    lastName: string | undefined | null;
    email: string | undefined | null;
    password: string | undefined | null;
    confirmPassword: string | undefined | null;
    matricula: string | undefined | null;
    photo: string |null | undefined;
}
export const initialFormData: RegisterUserForm = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    matricula: '',
    photo: '',
};