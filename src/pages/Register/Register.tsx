import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import work from "../../assets/work.webp";
import styles from "./register.module.css";
import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";
import { initialFormData, RegisterUserForm } from "../../models/register.model";
import { validateForm, ValidationRegisterErrors } from "../../helpers/validateRegisterForm";
import { useStorage } from "../../hooks/useStorage";
import { hashPassword } from "../../helpers/encryptPassword";
import { useAuth } from '../../helpers/AuthProvider'
import { Redirect } from "react-router";


const Register: React.FC = () => {
  const {user } = useAuth();

  const [formData, setFormData] = useState<RegisterUserForm>({
    name: "",
    lastName: "",
    password: "",
    email: "",
    matricula: "",
    confirmPassword: "",
    photo: "",
  });
  const [errors, setErrors] = useState<ValidationRegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {createUser} = useStorage();

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        quality: 100,
      });

      // Update state with the photo URI
      setFormData((prev) => ({ ...prev, photo: image.dataUrl }));

    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        try {
          if(formData.password != null || formData.password != undefined) {
            const hashedPassword = await hashPassword(formData.password);
            const updatedFormData = { ...formData, password: hashedPassword };
            await createUser(updatedFormData);
            resetForm();
            window.location.href = '/';
          }
        } catch (error) {
          console.error('Error submitting form', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [formData]
  );

  useEffect(() => {

  }, [isSubmitting, formData]);

  return (
    <>
      {
        !user ? <div className={styles.container}>
        <img src={work} alt="working" />
        <h2>Registro</h2>
        <p style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet consectetur explicabo laborum
        </p>

        <form  className={styles.loginForm}>
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
                type="password"
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
                type="password"

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
          <IonButton type="submit"  disabled={isSubmitting} onClick={(e) => handleSubmit(e)}>
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </IonButton>
        </div>
      </div>
      :
      <Redirect to="/incident-register" />
      }
    </>
  );
};

export default Register;
