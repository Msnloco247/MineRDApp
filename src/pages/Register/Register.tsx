import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useState } from "react";
import work from "../../assets/work.webp";
import styles from "./register.module.css";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { RegisterForm } from "../../models/register.model";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    lastName: "",
    password: "",
    email: "",
    matricula: "",
    confirmPassword: "",
    photo: null,
  });

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    });

    setFormData((prev) => ({ ...prev, photo: image }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.container}>
        <img src={work} alt="working" />
        <h2>Registro</h2>
        <p style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur explicabo laborum
        </p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <IonList>
            <IonItem>
              <IonInput
                value={formData.name}
                onIonChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.detail.value }));
                }}
                label="Nombre"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={formData.lastName}
                onIonChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.detail.value,
                  }));
                }}
                label="Apellido"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={formData.matricula}
                onIonChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    matricula: e.detail.value,
                  }));
                }}
                label="Matricula"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.detail.value }));
                }}
                label="Correo"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={formData.password}
                onIonChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.detail.value,
                  }));
                }}
                label="Contrasena"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={formData.confirmPassword}
                onIonChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.detail.value,
                  }));
                }}
                label="Confirmar Contrasena"
              ></IonInput>
            </IonItem>

            <IonItem onClick={takePhoto}>
              <span>Seleccionar Foto </span>
            </IonItem>
          </IonList>
        </form>

        <div className={styles.loginButton}>
          <IonButton routerLink="/" fill="outline">
            Regresar
          </IonButton>
          <IonButton routerLink="/login">Registrarse</IonButton>
        </div>
      </div>
    </>
  );
};

export default Register;
