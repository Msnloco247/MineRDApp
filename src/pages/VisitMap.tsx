import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup , useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Definir la interfaz para los datos de visita
interface Visit {
  latitud: number;
  longitud: number;
  cedula: string;
  codigo: string;
  motivo: string;
}

const VisitMap: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    fetch('https://adamix.net/minerd/api/visitas.php')
      .then(response => response.json())
      .then((data: Visit[]) => setVisits(data))
      .catch(error => console.error('Error fetching visits:', error));
  }, []);
  
  const MapComponent: React.FC = () => {
    const map = useMap();
    React.useEffect(() => {
      map.invalidateSize();
    }, [map]);
    return null;
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mapa de Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

          <MapContainer center={[18.48, -69.90]} zoom={10} style={{ height: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {visits.map((visit, index) => (
              <Marker key={index} position={[visit.latitud, visit.longitud]}>
                <Popup>
                  <h2>{visit.cedula}</h2>
                  <p>{visit.codigo}</p>
                  <p>{visit.motivo}</p>
                </Popup>
              </Marker>
            ))}
            <MapComponent />

          </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default VisitMap;
