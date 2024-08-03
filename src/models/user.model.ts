import { Photo } from "@capacitor/camera";

export interface User {
    name: string | undefined |null;
    lastName: string | undefined | null;
    email: string | undefined | null;
    password: string | undefined | null;
    matricula: string | undefined | null;
    photo: Photo |null;
    id: string;
}