import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';

// Importa las nuevas páginas
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthProvider } from './helpers/AuthProvider';
import PrivateRoute from './components/PrivateRoute';

import RegisterVisit from './pages/RegisterVisit';
import VisitTypes from './pages/VisitTypes';
import VisitMap from './pages/VisitMap';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
       <AuthProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" component={Home} exact={true}/>

              <Route path="/login" exact={true}>
                <Login/>
              </Route>

              <Route path="/register" exact={true}>
                <Register/>
              </Route>

              <PrivateRoute path="/folder/:name" exact={true} component={Page} />
              
               {/* Rutas nuevas */}
              <Route path="/register-visit" exact={true}>
                <RegisterVisit />
              </Route>

              <Route path="/visit-types" exact={true}>
                <VisitTypes />
              </Route>

              <Route path="/visit-map" exact={true}>
                <VisitMap />
              </Route>
              
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </AuthProvider>

    </IonApp>
  );
};

export default App;
