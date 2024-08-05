import { Photo } from "@capacitor/camera";

export interface UserViewModel {
    name: string | undefined |null;
    lastName: string | undefined | null;
    email: string | undefined | null;
    matricula: string | undefined | null;
    photo: string |null | undefined;
    id: string;
}