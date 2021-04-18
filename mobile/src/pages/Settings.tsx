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
  IonRow,
  IonCol,
  IonIcon,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { personCircleOutline } from 'ionicons/icons'
import './Settings.css';

const Settings: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  // const [showLoginAlert, setShowLoginAlert] = useState(false);
  // const [loginErronMessage, setLoginErronMessage] = useState<string>();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle>Settings</IonTitle>
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
              <IonLabel position="fixed">Email</IonLabel>
              <IonInput type="text" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
              <IonInput type="confirm_password" value={confirm_password} onIonChange={e => setConfirmPassword(e.detail.value!)}></IonInput>
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
    </IonPage>
  );
};

export default Settings;
