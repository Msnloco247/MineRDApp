import { Photo } from "@capacitor/camera";

export interface RegisterForm {
    name: string | undefined |null;
    lastName: string | undefined | null;
    email: string | undefined | null;
    password: string | undefined | null;
    confirmPassword: string | undefined | null;
    matricula: string | undefined | null;
    photo: Photo |null;
}