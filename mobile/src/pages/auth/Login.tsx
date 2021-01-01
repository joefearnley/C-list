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
  IonButton 
} from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
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
            <IonItem>
                <IonLabel position="fixed">Username</IonLabel>
                <IonInput type="text" value={username} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
                <IonLabel position="fixed">Password</IonLabel>
                <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton expand="block">Log in</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;