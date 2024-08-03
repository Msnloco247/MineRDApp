import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonText, IonTextarea, IonThumbnail, IonTitle, IonToolbar, useIonLoading, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter } from '@ionic/react';
import { AudioData, useAudio } from '../../hooks/useAudio'
import './style.css';
import { useEffect, useState } from 'react';
import { camera, images, pause, pencil, play, trash, stop, refresh } from 'ionicons/icons';
import { defaultIncident, Incident, IncidentData } from '../../models/IncidentData';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';

const IncidentList: React.FC = () => {
  const [selectedIncident, setSelectedEvent] = useState<Incident>(defaultIncident);
  const { incidents, readIncident, updateIncident, deleteIncident } = IncidentData();
  const [presentImageLoading, dismissImageLoading] = useIonLoading();
  const { takePhoto, pickPhoto } = usePhotoGallery();
  const [photoPreview, setPhotoPreview] = useState("");
  const { selectAudioFile, importAudio, pauseOrResumeAudio, stopAudio, unloadAudio } = useAudio();
  const [audioPreview, setAudioPreview] = useState("");
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const isAudioSet = () => { return audioPreview != "" };

  async function selectAudio() {
    if (isAudioSet()) {
      unloadAudio(audioPreview);
      setAudioPreview("");
      setAudioPlaying(false);
    }
    selectedIncident.audio = await selectAudioFile() as AudioData;
    setAudioPreview(selectedIncident.audio.audioId);
    importAudio(selectedIncident.audio.audioId, selectedIncident.audio);
    // preloadAudio(audioId, getAudioPath(selectedIncident.audio));
  }

  async function playPauseAudio(audio: string) {
    // await pauseOrResumeAudio(audio);
    await setAudioPlaying(await pauseOrResumeAudio(audio));
  }

  async function playPauseIncidentAudio(audio: AudioData) {

    if (audioPreview == audio.audioId) {
      await playPauseAudio(audio.audioId);
      return;
    }
    if (isAudioSet()) {
      unloadAudio(audioPreview);
      setAudioPreview("");
      await setAudioPlaying(false);
    }
    await setAudioPreview(audio.audioId);
    await importAudio(audio.audioId, audio).then(() => playPauseAudio(audio.audioId)); // Import audio on demand
  }

  async function stopCurrentAudio(audio: string) {
    stopAudio(audio);
    setAudioPlaying(false);
  }

  const pickEventPhoto = async () => {
    presentImageLoading({
      message: 'Importando imagen'
    });
    await pickPhoto()
      .then((photo) => {
        selectedIncident.photo = photo;
        setPhotoPreview(selectedIncident.photo.webviewPath as string);
      }).catch(() => console.log("pickPhoto action cancelled by user"))
      .finally(() => dismissImageLoading());
  }

  const takeEventPhoto = async () => {
    presentImageLoading({
      message: 'Importando imagen'
    });
    await takePhoto()
      .then((photo) => {
        selectedIncident.photo = photo;
        setPhotoPreview(selectedIncident.photo.webviewPath as string);
      }).catch(() => console.log("takePhoto action cancelled by user"))
      .finally(() => dismissImageLoading());
  }

  async function openUpdateEventModal(id: string) {
    await presentImageLoading({ message: 'Cargando incidente' });
    const readedEvent = await readIncident(id);
    setSelectedEvent(readedEvent);
    setPhotoPreview(readedEvent.photo.webviewPath as string);
    setAudioPreview(readedEvent.audio.audioId);
    importAudio(selectedIncident.audio.audioId, selectedIncident.audio);
    dismissImageLoading();
    setUpdateModalOpen(true);
  }

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Incidencias</IonTitle>
          <IonButtons slot='end'>
            {/* <IonButton fill='solid' onClick={() => {loadIncidents()}}><IonIcon md={refresh}/></IonButton> */}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {incidents.map((incident, key) => {
            let incidentAudioPreview = incident.audio.audioId;
            return (
              <IonItem key={key}>
                <IonCard style={{ width: "100%" }}>
                  <IonThumbnail>
                    <img src={incident.photo?.webviewPath} alt="Imagen del incidente" />
                  </IonThumbnail>
                  <IonCardHeader>
                    <IonCardTitle>
                      {incident.title}
                      <IonButtons slot='end'>
                        <IonButton>Editar</IonButton>
                      </IonButtons>
                    </IonCardTitle>
                    <IonCardSubtitle>{incident.date} - {incident.school} - {incident.regional} - {incident.district}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText>
                      <p>{incident.description}</p>
                      </IonText>
                  </IonCardContent>
                  <IonToolbar>

                    <IonButtons slot='start' className='ion-padding'>
                      <IonButton
                        fill='solid'
                        color='primary'
                        expand='block'
                        disabled={incidentAudioPreview == ""}
                        onClick={() => {
                          playPauseIncidentAudio(incident.audio);
                        }}
                      >{
                          isAudioPlaying && audioPreview === incident.audio.audioId ? <IonIcon md={pause} /> : <IonIcon md={play} />
                        }</IonButton>
                      <IonButton
                        fill='solid'
                        color='primary'
                        expand='block'
                        disabled={incidentAudioPreview == ""}
                        onClick={() => stopCurrentAudio(incident.audio.audioId)}
                      ><IonIcon md={stop} /></IonButton>
                    </IonButtons>

                    <IonButtons slot='end' className='ion-padding'>
                      <IonButton
                        fill='solid'
                        color='primary'
                        id="update-incident-modal"
                        onClick={() => { openUpdateEventModal(incident.id) }}>
                        <IonIcon md={pencil} />
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonCard>
              </IonItem>
            );
          })}
        </IonList>

        {incidents.length == 0 ? <IonLabel>Aqui se veran las incidencias registradas</IonLabel> : null}

        <IonModal isOpen={isUpdateModalOpen} backdropDismiss={false} >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setUpdateModalOpen(false)}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Editando incidente</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Titulo"
              labelPlacement="floating"
              fill="solid"
              placeholder="Nuevo incidente"
              value={selectedIncident.title}
              onIonInput={(ev) => selectedIncident.title = (ev.currentTarget as HTMLInputElement).value}
            />
            <br />
            <IonInput
              label="Centro educativo"
              labelPlacement="floating"
              fill="solid"
              placeholder="Centro educativo"
              value={selectedIncident?.school}
              onIonInput={(ev) => selectedIncident.school = (ev.currentTarget as HTMLInputElement).value}
            />
            <br />
            <IonInput
              label="Regional"
              labelPlacement="floating"
              fill="solid"
              placeholder="Regional"
              value={selectedIncident?.regional}
              onIonInput={(ev) => selectedIncident.regional = (ev.currentTarget as HTMLInputElement).value}
            />
            <br />
            <IonInput
              label="Distrito"
              labelPlacement="floating"
              fill="solid"
              placeholder="Distrito"
              value={selectedIncident?.district}
              onIonInput={(ev) => selectedIncident.district = (ev.currentTarget as HTMLInputElement).value}
            />
            <br />
            <IonTextarea
              label="Descripcion"
              labelPlacement="floating"
              fill="solid"
              placeholder="Escriba la descripcion de este incidente..."
              value={selectedIncident.description}
              autoGrow={true}
              rows={4}
              onIonInput={(ev) => selectedIncident.description = (ev.currentTarget as HTMLInputElement).value}
            />
            <br />
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
              <IonDatetime
                value={selectedIncident.date == "" ? "" : new Date(selectedIncident.date).toISOString()}
                presentation='date'
                id="datetime"
                onIonChange={(ev) => selectedIncident.date = new Date(ev.detail.value as string).toLocaleDateString()}
              ></IonDatetime>
            </IonModal>
            <br />
            <IonCard>
              <IonToolbar>
                <IonTitle>Imagen</IonTitle>
                <IonButtons slot='end'>
                  <IonButton
                    fill='solid'
                    color='primary'
                    expand='block'
                    onClick={() => pickEventPhoto()}>
                    <IonIcon icon={images}></IonIcon>
                  </IonButton>

                  <IonButton
                    fill='solid'
                    color='primary'
                    expand='block'
                    onClick={() => takeEventPhoto()}>
                    <IonIcon icon={camera}></IonIcon>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
              <IonThumbnail>
                {photoPreview != "" ?
                  <img src={photoPreview} alt={"previsualizacion de imagen nueva"} width="100%" height="100%" />
                  : null}
              </IonThumbnail>
            </IonCard>

            <br />
            <IonCard>
              <IonToolbar>
                <IonTitle>Audio</IonTitle>
                <IonButtons>
                  <IonButton
                    fill='solid'
                    color='primary'
                    expand='block'
                    onClick={() => selectAudio()}
                  >Importar audio</IonButton>

                  {
                    isAudioSet() ?
                      <IonLabel>Sonido seleccionado: {selectedIncident?.audio.name}</IonLabel> :
                      <IonLabel>Sonido seleccionado: Ninguno</IonLabel>
                  }

                  <IonButton
                    fill='solid'
                    color='primary'
                    expand='block'
                    disabled={!isAudioSet()}
                    onClick={() => playPauseAudio(audioPreview)}
                  >{
                      isAudioPlaying ? <IonIcon md={pause} /> : <IonIcon md={play} />
                    }</IonButton>

                  <IonButton
                    fill='solid'
                    color='primary'
                    expand='block'
                    disabled={!isAudioSet()}
                    onClick={() => stopAudio(audioPreview)}
                  ><IonIcon md={stop} /></IonButton>
                </IonButtons>
              </IonToolbar>
            </IonCard>
          </IonContent>

          <IonToolbar>
            <IonButton
              expand='block'
              strong={true}
              onClick={() => {
                setUpdateModalOpen(false);
                updateIncident(selectedIncident);
              }}>
              Confirmar cambios
            </IonButton>
            <IonButtons slot='end'>
              <IonButton
                fill='solid'
                onClick={() => {
                  setUpdateModalOpen(false);
                  deleteIncident(selectedIncident);
                }}><IonIcon md={trash} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default IncidentList;
