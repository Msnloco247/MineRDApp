import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';

import {
    logOut, 
      logOutOutline,
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  mapOutline, // Asegúrate de tener el icono adecuado importado
  mapSharp,
  addOutline, // Asegúrate de tener el icono adecuado importado
  addSharp,
  listOutline, // Asegúrate de tener el icono adecuado importado
  listSharp,
  informationCircle,
  informationCircleOutline,
  list,
  createOutline,
  create
} from 'ionicons/icons';
import './Menu.css';
import { useAuth } from '../helpers/AuthProvider'

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Registro de Incidencias',
    url: '/incident-register',
    iosIcon: createOutline,
    mdIcon: create
  },
  {
    title: 'Lista de Incidencias',
    url: '/incident-list',
    iosIcon: listOutline,
    mdIcon: list
  },
  {
    title: 'Register Visit',
    url: '/register-visit',
    iosIcon: addOutline,
    mdIcon: addSharp
  },
  {
    title: 'Visit Types',
    url: '/visit-types',
    iosIcon: listOutline,
    mdIcon: listSharp
  },
  {
    title: 'Visit Map',
    url: '/visit-map',
    iosIcon: mapOutline,
    mdIcon: mapSharp
  },
  {
    title: 'Acerca de',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircle
  },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const { logout} = useAuth();



  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
            <IonItem lines="full">
              <IonIcon aria-hidden="true" slot="start" icon={logOutOutline} />
              <IonLabel onClick={logout}>Desconectarse</IonLabel>
            </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
