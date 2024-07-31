import React from 'react'
import styles from './home.module.css'
import { IonButton } from '@ionic/react'
import work from '../../assets/work.webp'

const Home: React.FC = () => {
  return (
    <div  >
      <div className={styles.container}>
        <img src={work} alt="working" />
        <h2 >Bienvenido</h2>
        <p>Lorem ipsum dolor sit amet consectetur explicabo laborum eligendi deleniti optio fuga rem recusandae nam! Quaerat sint doloribus temporibus tempora!</p>

        <div>
          <IonButton routerLink='/login' >Login</IonButton>
          <IonButton routerLink='/register' fill='outline'>Register</IonButton>
        </div>

        <footer className={styles.footer}>
          Todos los derechos reservados
        </footer>
      </div>

    </div>
  )
}

export default Home