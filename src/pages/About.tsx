import { IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './page.css';
// import Author from '../assets/author.jpg';
// import { mail, logoGithub, logoLinkedin } from 'ionicons/icons';
import { IncidentData } from '../models/IncidentData';
import { useRef } from 'react';
import { useAuth } from '../helpers/AuthProvider';

const About: React.FC = () => {

    const { user } = useAuth();

  const ionItem = useRef(null as any);
  const { deleteAll } = IncidentData();

  const DeleteAllData = async() => {
    await deleteAll();
    ionItem.current.close();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acerca de</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
      <IonCard>
          <IonCardHeader>
            <IonLabel><img src={user?.photo?.webPath} alt="FOTO DEL USUARIO LOGEADO" width="100%" height="100%" /></IonLabel>
            <IonCardSubtitle color="primary"><h4>{user?.name} {user?.lastName}</h4></IonCardSubtitle>
            <IonCardSubtitle>{user?.matricula}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {/* <p>
              <strong>Contacto:</strong>
            </p>
            <h1>
              <a href="mailto: arielnunezmendez@gmail.com"><IonIcon aria-hidden="true" md={mail} /></a>
              <a href="https://github.com/APROMASTER"><IonIcon aria-hidden="true" md={logoGithub} /></a>
              <a href="https://www.linkedin.com/in/ariel-alejandro-nuñez-mendez-53b333290/"><IonIcon aria-hidden="true" md={logoLinkedin} /></a>
            </h1> */}

          </IonCardContent>
          <br />
        </IonCard>
        <br />
        <IonLabel>
          <blockquote>«La educacion es el arma mas poderosa que puedes usar para cambiar el mundo».- Nelson Mandela</blockquote>
        </IonLabel>
        <br />
        <IonItemSliding ref={ionItem}>
          <IonItem><IonLabel color='danger'>Deslice a la derecha para eliminar todos los datos registrados</IonLabel></IonItem>
          <IonItemOptions side='start'>
                    <IonItemOption
                    id='present-deleteall-alert'
                      color='danger'
                      onClick={() => {}}>
                      Eliminar
                    </IonItemOption>
                  </IonItemOptions>
        </IonItemSliding>

        <IonAlert
        trigger="present-deleteall-alert"
        header="Esta seguro de eliminar todos los datos?"
        message="No habra vuelta atras."
        buttons={[{text: 'Si', handler: () => {DeleteAllData();}}, 'No']}
      ></IonAlert>
        
      </IonContent>
    </IonPage>
  );
};

export default About;
