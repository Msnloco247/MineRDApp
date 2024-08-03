// src/pages/DirectorDetails.tsx
import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList } from '@ionic/react';

// Define una interfaz para los detalles del director
interface Director {
  nombre: string;
  escuela: string;
  telefono: string;
}

const DirectorDetails: React.FC = () => {
  const [directorId, setDirectorId] = useState<string>('');
  const [directorDetails, setDirectorDetails] = useState<Director | null>(null);

  const fetchDirectorDetails = () => {
    fetch(`https://adamix.net/minerd/api/directores.php?cedula=${directorId}`)
      .then(response => response.json())
      .then(data => setDirectorDetails(data))
      .catch(error => console.error('Error fetching director details:', error));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consulta de Director</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">Cédula del Director</IonLabel>
          <IonInput value={directorId} onIonChange={e => setDirectorId(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton onClick={fetchDirectorDetails}>Consultar</IonButton>
        {directorDetails && (
          <IonList>
            <IonItem>
              <IonLabel>Nombre: {directorDetails.nombre}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Escuela: {directorDetails.escuela}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Teléfono: {directorDetails.telefono}</IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DirectorDetails;
