import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importa CameraSource
import { Geolocation } from '@capacitor/geolocation';

const RegisterVisit: React.FC = () => {
  const [directorId, setDirectorId] = useState('');
  const [centerCode, setCenterCode] = useState('');
  const [visitReason, setVisitReason] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [audio, setAudio] = useState<Blob | null>(null); // Modifica el tipo
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Usa CameraSource.Camera
      quality: 100,
    });
    setPhoto(image.webPath || null);
  };

  const recordAudio = async () => {
    // Implementa la grabación de audio aquí (usar una alternativa o plugin adecuado)
  };

  const getCurrentLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setLocation({
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const visitData = {
      cedula: directorId,
      codigo: centerCode,
      motivo: visitReason,
      comentario: comment,
      foto: photo,
      audio: audio, // Actualiza el valor de audio
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
          <IonTitle>Registrar Visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Cédula del Director</IonLabel>
            <IonInput value={directorId} onIonChange={e => setDirectorId(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Código del Centro</IonLabel>
            <IonInput value={centerCode} onIonChange={e => setCenterCode(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Motivo de la Visita</IonLabel>
            <IonInput value={visitReason} onIonChange={e => setVisitReason(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Comentario</IonLabel>
            <IonTextarea value={comment} onIonChange={e => setComment(e.detail.value!)}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonButton onClick={takePhoto}>Tomar Foto</IonButton>
            {photo && <img src={photo} alt="Evidencia" />}
          </IonItem>
          <IonItem>
            <IonButton onClick={recordAudio}>Grabar Audio</IonButton>
            {audio && <p>Audio grabado</p>}
          </IonItem>
          <IonItem>
            <IonButton onClick={getCurrentLocation}>Obtener Ubicación</IonButton>
          </IonItem>
          <IonButton type="submit">Registrar Visita</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RegisterVisit;
