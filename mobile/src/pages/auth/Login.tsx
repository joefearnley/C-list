import React, { useState } from 'react';
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonIcon,
  IonAlert
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [loginErronMessage, setLoginErronMessage] = useState<string>();

  console.log();

  const login = () => {
    api.post(`${api.defaults.baseURL}/token-auth/`, {
      username,
      password
    })
    .then(res => {
      localStorage.setItem('auth_token', res.data.token);
      history.push('/upcoming/');
    })
    .catch(err => {
      if (err.response) {
        for (const [key, value] of Object.entries(err.response.data)) {
          console.log(`${key}: ${value}`);
        }

        setLoginErronMessage('Error Logging in user. Please check username and password.');
        setShowLoginAlert(true);
      }
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log in</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log in</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow className="ion-padding">
          <IonCol className="ion-text-center">
            <IonIcon
              style={{ fontSize: "70px", color: "#93b7beff" }}
              icon={personCircleOutline}
            />
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Username</IonLabel>
              <IonInput type="text" value={username} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol>
            <IonButton expand="block" onClick={login}>Log in</IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol>
            <p>Don't have an account? <a href="/sigup">Sign Up</a></p>
          </IonCol>
        </IonRow>
      </IonContent>
      <IonAlert
          isOpen={showLoginAlert}
          onDidDismiss={() => setShowLoginAlert(false)}
          cssClass='my-custom-class'
          header={'Log in Error'}
          subHeader={'Log in Error'}
          message={loginErronMessage}
          buttons={['OK']}
        />
    </IonPage>
  );
};

export default Login;