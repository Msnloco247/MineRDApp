import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

// Definir la interfaz para el tipo de visita
interface VisitType {
  nombre: string;
}

const VisitTypes: React.FC = () => {
  const [visitTypes, setVisitTypes] = useState<VisitType[]>([]);

  useEffect(() => {
    fetch('https://adamix.net/minerd/api/tipo_visitas.php')
      .then(response => response.json())
      .then((data: VisitType[]) => setVisitTypes(data))
      .catch(error => console.error('Error fetching visit types:', error));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tipos de Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {visitTypes.map((visitType, index) => (
            <IonItem key={index}>
              <IonLabel>{visitType.nombre}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default VisitTypes;
