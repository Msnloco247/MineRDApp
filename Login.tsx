import React, { useCallback, useState } from "react";
import work from "../../assets/work.webp";
import styles from "./login.module.css";
import { LoginUserForm } from "../../models/login.model";
import { validateForm, ValidationLoginErrors } from "../../helpers/validateLoginForm";
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../helpers/AuthProvider'
import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";

const Login: React.FC = () => {
  const { login, user } = useAuth();

  const [formData, setFormData] = useState<LoginUserForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationLoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        try {
          if (formData.password != null || formData.password != undefined) {
            await login(formData);
          }
        } catch (error) {
          setErrors({ general: 'Error al iniciar sesión. Por favor, intenta de nuevo.' });
          console.error('Error submitting form', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [formData]
  );

  return (
    <>
      {!user ? (
        <div className={styles.container}>
          <img src={work} alt="working" />
          <h2>Inicia Sesion</h2>
          <p style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur explicabo laborum
          </p>

          <form className={styles.loginForm}>
            <IonList>
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
                  type="password"
                  label="Contrasena"
                ></IonInput>
              </IonItem>
            </IonList>
            {errors.general && <div className={styles.error}>{errors.general}</div>}
          </form>

          <div className={styles.loginButton}>
            <IonButton routerLink="/" fill="outline">
              Regresar
            </IonButton>
            <IonButton onClick={handleClick} routerLink="/login">
              {isSubmitting ? 'Iniciando Sesion...' : 'Iniciar Sesion'}
            </IonButton>
          </div>
        </div>
      ) : (
        <Redirect to="/folder/Inbox" />
      )}
    </>
  );
};

export default Login;
