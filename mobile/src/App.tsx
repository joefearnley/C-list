import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Upcoming from './pages/Upcoming';
import EditItem from './pages/items/EditItem';
import AddItem from './pages/items/AddItem';

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

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  const authToken = localStorage.getItem('auth_token');
  const isAuthenticated = authToken ? true : false;

  return (
    <IonApp>
      return { isAuthenticated ? (
        <IonReactRouter>
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/items/add" component={AddItem} />
          <Route path="/items/edit/:id" component={EditItem} />
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <Route path="/" component={Landing} exact={true} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </IonReactRouter>
      )}
    </IonApp>
  )
};

export default App;
