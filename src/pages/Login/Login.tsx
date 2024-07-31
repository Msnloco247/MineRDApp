import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import React from "react";
import work from "../../assets/work.webp";
import styles from "./login.module.css";

const Login: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <img src={work} alt="working" />
        <h2>Inicia Sesion</h2>
        <p style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur explicabo laborum
        </p>

        <form  className={styles.loginForm}>
          <IonList>
            <IonItem>
              <IonInput  label="Correo"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label="Contrasena" ></IonInput>
            </IonItem>
          </IonList>
        </form>

        <div className={styles.loginButton}>
          <IonButton routerLink="/" fill="outline">
            Regresar
          </IonButton>
          <IonButton routerLink="/login">Iniciar Sesion</IonButton>
        </div>
      </div>
    </>
  );
};

export default Login;
