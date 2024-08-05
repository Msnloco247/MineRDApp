import React from 'react'
import styles from './home.module.css'
import { IonButton } from '@ionic/react'
import work from '../../assets/work.webp'
import { Redirect } from 'react-router'
import { useAuth } from '../../helpers/AuthProvider'


const Home: React.FC = () => {
  const {user } = useAuth();

  return (<>
  
    {!user ?
      <div>
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
    :
    <Redirect to="/folder/Inbox" />
    }
    </>
  )
}

export default Home