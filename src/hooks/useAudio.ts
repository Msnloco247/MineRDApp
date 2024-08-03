import { NativeAudio } from '@capacitor-community/native-audio';
import { FilePicker, PickedFile } from '@capawesome/capacitor-file-picker';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';

export interface AudioData {
    name: string,
    filepath: string,
    webviewPath: string,
    audioId: string,
}

export function useAudio() {
    const getAudioPath = (audio: AudioData) => {
        const path = isPlatform('desktop') ? audio.webviewPath : audio.filepath;
        return path;
    }

    const selectAudioFile = async (): Promise<AudioData | undefined> => {
        const result = await FilePicker.pickFiles({
            types: ['audio/*'],
            readData: true,
            limit: 1
        });

        if (result.files && result.files.length > 0) {
            const file = result.files[0];
            console.log(file);

            const savedFileAudio = await saveAudio(file);
            console.log(savedFileAudio);
            return (
                savedFileAudio
            );
        };
    }

    const saveAudio = async (audio: PickedFile): Promise<AudioData> => {
        const fileName = audio.name + "-" + new Date().getUTCSeconds();
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: audio.data as string,
            directory: Directory.Data,
        });

        const webpath = isPlatform('desktop') ? URL.createObjectURL(audio.blob as Blob) : "";

        return {
            name: audio.name,
            filepath: savedFile.uri,
            webviewPath: webpath,
            audioId: self.crypto.randomUUID(),
        };
    };

    const preloadAudio = async (audioId: string, audioPath: string) => {
        await NativeAudio.preload({
            assetId: audioId,
            assetPath: audioPath,
            isUrl: true
        });
    };

    const preloadAudioFromAudioData = async (audioId: string, audioData: AudioData) => {
        try {
            await NativeAudio.preload({
                assetId: audioId,
                assetPath: getAudioPath(audioData),
                isUrl: true
            });
            // console.log(`audio LOADED ${audioData.audioId} with ${audioData.webviewPath}`);
        } catch (error) {

        }
    };

    const isPlayingAudio = async (audioId: string): Promise<boolean> => {
        let isPlaying = false;
        await NativeAudio.isPlaying({
            assetId: audioId
        }).then((value) => {
            isPlaying = value.isPlaying;
            // console.log(audioId + (isPlaying ? " is playing" : " is not playing"));
        }).catch(() => { return false; });

        return isPlaying;
    };

    const playAudio = async (audioId: string) => {
        const getCurrentTime = await NativeAudio.getCurrentTime({ assetId: audioId });
        await NativeAudio.play({
            assetId: audioId,
            time: getCurrentTime.currentTime,
        });
    };

    const pauseAudio = async (audioId: string) => {
        await NativeAudio.pause({
            assetId: audioId
        });
    };

    const stopAudio = async (audioId: string) => {
        await NativeAudio.stop({
            assetId: audioId
        });
    };

    const unloadAudio = async (audioId: string) => {
        try {
            await NativeAudio.unload({
                assetId: audioId
            });
        } catch (error) {

        }
    };

    async function importAudio(audioId: string, audioData: AudioData) {
        console.log(audioData);
        // Try stop existing audio
        try {
            if (await isPlayingAudio(audioId)) stopAudio(audioId);
            await unloadAudio(audioId);
        } catch (error) {

        } finally {
            preloadAudioFromAudioData(audioId, audioData);
        }

    }

    async function pauseOrResumeAudio(audioId: string) {
        if (await isPlayingAudio(audioId)) {
            pauseAudio(audioId);
            // console.log(`PAUSE ${audioId}`);
            return false;
        } else {
            playAudio(audioId);
            // console.log(`PLAY ${audioId}`);
            return true;
        }
    }

    return {
        getAudioPath,
        selectAudioFile,
        preloadAudio,
        playAudio,
        pauseAudio,
        stopAudio,
        isPlayingAudio,
        unloadAudio,
        importAudio,
        pauseOrResumeAudio,
    }
}

export const deleteAudio = async (filePath: string) => {
    try {
        await Filesystem.deleteFile({
            directory: Directory.Data,
            path: filePath,
        });
    } catch (error) {
        console.error("Error deleting audio:", error);
    }
};