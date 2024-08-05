import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList, IonButtons, IonMenuButton } from '@ionic/react';

interface SchoolDetail {
  nombre: string;
  direccion: string;
  telefono: string;
}

const SchoolDetails: React.FC = () => {
  const [schoolCode, setSchoolCode] = useState('');
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetail | null>(null);

  const fetchSchoolDetails = () => {
    fetch(`https://adamix.net/minerd/api/escuelas.php?codigo=${schoolCode}`)
      .then(response => response.json())
      .then((data: SchoolDetail) => setSchoolDetails(data))
      .catch(error => console.error('Error fetching school details:', error));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Consulta de Escuela</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="stacked">Código de la Escuela</IonLabel>
          <IonInput value={schoolCode} onIonChange={e => setSchoolCode(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton onClick={fetchSchoolDetails}>Consultar</IonButton>
        {schoolDetails && (
          <IonList>
            <IonItem>
              <IonLabel>Nombre: {schoolDetails.nombre}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Dirección: {schoolDetails.direccion}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Teléfono: {schoolDetails.telefono}</IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SchoolDetails;
