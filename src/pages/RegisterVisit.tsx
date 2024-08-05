import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonTextarea, IonList, IonButtons, IonMenuButton } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

const RegisterVisit: React.FC = () => {
  const [directorId, setDirectorId] = useState('');
  const [centerCode, setCenterCode] = useState('');
  const [visitReason, setVisitReason] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    setPhoto(image.webPath || null);
  };

  const recordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
  
      let audioChunks: Blob[] = [];
  
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
  
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
        const url = URL.createObjectURL(audioBlob);
        setAudio(audioBlob);
        setAudioUrl(url);
        console.log("Audio:", url);
        console.log("Audio:", setAudioUrl(url));
        console.log("audioBlob:", audioBlob);
      };
  
      if (isRecording) {
        recorder.stop();
        setIsRecording(false);
      } else {
        audioChunks = [];
        recorder.start();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };
  const getCurrentLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setLocation({
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    });

    console.log(coordinates);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const visitData = {
      cedula: directorId,
      codigo: centerCode,
      motivo: visitReason,
      comentario: comment,
      foto: photo,
      audio: audio,
      latitud: location.lat,
      longitud: location.lng,
    };
    fetch('https://adamix.net/minerd/api/registrar_visita.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Visita registrada:', data);
        // Handle the response from the API
      })
      .catch(error => console.error('Error registering visit:', error));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Registrar Visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Cédula del Director</IonLabel>
              <IonInput
                value={directorId}
                onIonChange={(e) => setDirectorId(e.detail.value!)}
                placeholder="Ingrese la cédula del director"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Código del Centro</IonLabel>
              <IonInput
                value={centerCode}
                onIonChange={(e) => setCenterCode(e.detail.value!)}
                placeholder="Ingrese el código del centro"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Motivo de la Visita</IonLabel>
              <IonInput
                value={visitReason}
                onIonChange={(e) => setVisitReason(e.detail.value!)}
                placeholder="Ingrese el motivo de la visita"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Comentario</IonLabel>
              <IonTextarea
                value={comment}
                onIonChange={(e) => setComment(e.detail.value!)}
                placeholder="Ingrese un comentario"
              />
            </IonItem>
          </IonList>
          <IonList>
            <IonItem>
              <IonButton onClick={takePhoto}>Tomar Foto</IonButton>
              {photo && <img src={photo} alt="Evidencia" />}
            </IonItem>
            <IonItem>
              <IonButton onClick={recordAudio}>
                {isRecording ? 'Detener Grabación' : 'Grabar Audio'}
              </IonButton>
              {isRecording && (
                <IonButton onClick={stopRecording}>Detener</IonButton>
              )}
              {audio && <p>Audio grabado</p>}
              {audioUrl && <audio controls src={audioUrl}></audio>}
            </IonItem>
            <IonItem>
              <IonButton onClick={getCurrentLocation}>Obtener Ubicación</IonButton>
              <IonLabel>
                Latitud
              </IonLabel>
              <IonInput value={location.lat} disabled />
              <IonLabel>
                Longitud
              </IonLabel>
              <IonInput value={location.lng} disabled />
            </IonItem>
          </IonList>
          <IonButton type="submit" expand="block">
            Registrar Visita
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterVisit;