import { useEffect, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { deletePhoto, PhotoData } from "../hooks/usePhotoGallery";
import { AudioData, deleteAudio } from "../hooks/useAudio";
import { school } from "ionicons/icons";

export interface Incident {
    id: string,
    title: string,
    description: string,
    date: string,
    school: string,
    regional: string,
    district: string,
    photo: PhotoData,
    audio: AudioData,
}

export const defaultIncident: Incident = {
    id: "",
    title: "",
    description: "",
    school: "",
    regional: "",
    district: "",
    date: new Date().toLocaleDateString(),
    photo: { filepath: "", webviewPath: "" },
    audio: { name: "", filepath: "", webviewPath: "", audioId: "" }
};

export function IncidentData() {
    const { storageGet, storageSet } = useStorage();
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const DB_KEY = 'app-incident';

    useEffect(() => {
        const loadIncidents = async () => {
            try {
                const storedIncidents: Incident[] = await storageGet(DB_KEY) || [];
                setIncidents(storedIncidents);
                // console.log("Incidents loaded:", storedIncidents);
            } catch (error) {
                console.error("Error loading incidents:", error);
            }
        };

        loadIncidents();
    }, [storageGet]);

    const createIncident = async (eventToCreate: Incident) => {
        const newEvent = {
            id: self.crypto.randomUUID(),
            title: eventToCreate.title,
            description: eventToCreate.description,
            school: eventToCreate.school,
            regional: eventToCreate.regional,
            district: eventToCreate.district,
            date: eventToCreate.date,
            photo: eventToCreate.photo,
            audio: eventToCreate.audio
        }

        const updatedIncidents = [...incidents, newEvent];
        setIncidents(updatedIncidents); // Update state with the new array
        storageSet(DB_KEY, updatedIncidents);
    }

    const readIncident = async (id: string): Promise<Incident> => {
        return [...incidents].filter(event => event.id === id)[0];
    }

    const updateIncident = async (eventToUpdate: Incident) => {
        const toUpdate = [...incidents];
        let event = incidents.filter(event => event.id === eventToUpdate.id)[0];
        event.date = eventToUpdate.date;
        event.title = eventToUpdate.title;
        event.description = eventToUpdate.description;
        event.school = eventToUpdate.school;
        event.regional = eventToUpdate.regional;
        event.district = eventToUpdate.district;
        if (event.photo != eventToUpdate.photo) {
            deletePhoto(event.photo.filepath);
            event.photo = eventToUpdate.photo;
        }
        if (event.audio != eventToUpdate.audio) {
            deleteAudio(event.audio.filepath);
            event.audio = eventToUpdate.audio;
        }

        setIncidents(toUpdate);
        return storageSet(DB_KEY, toUpdate);
    }

    const deleteIncident = async (eventToDelete: Incident) => {
        deletePhoto(eventToDelete.photo.filepath);
        deleteAudio(eventToDelete.audio.filepath);
        const toUpdate = [...incidents].filter(event => event.id !== eventToDelete.id);
        setIncidents(toUpdate);
        return storageSet(DB_KEY, toUpdate);
    }

    const deleteAll = async () => {
        setIncidents([]);
        return storageSet(DB_KEY, []);
    }

    return {
        incidents,
        createIncident,
        readIncident,
        updateIncident,
        deleteIncident,
        deleteAll
    }
}