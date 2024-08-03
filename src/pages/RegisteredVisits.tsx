// src/pages/RegisteredVisits.tsx
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

// Define una interfaz para las visitas
interface Visit {
  cedula: string;
  codigo: string;
  motivo: string;
}

const RegisteredVisits: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    fetch('https://adamix.net/minerd/api/visitas.php')
      .then(response => response.json())
      .then(data => setVisits(data))
      .catch(error => console.error('Error fetching visits:', error));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas Registradas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {visits.map((visit, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{visit.cedula}</h2>
                <p>{visit.codigo}</p>
                <p>{visit.motivo}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RegisteredVisits;
