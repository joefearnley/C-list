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
import { useHistory } from 'react-router-dom';
import api from '../../api';
import './Signup.css';

const Signup: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showSignupAlert, setShowSignupAlert] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState<string>();

  const updateInformation = (email: string) => {
    setUsername(email);
    setEmail(email);
  };

  const signup = () => {
    api.post(`${api.defaults.baseURL}/account/`, {
      username,
      email,
      password
    })
    .then(res => {
      localStorage.setItem('auth_token', res.data.token);
      history.push('/upcoming/');
    })
    .catch(err => {
      if (err.response) {
        let messages = [];
        for (const [key, value] of Object.entries(err.response.data)) {
          messages.push(`${key}: ${value}`);
        }

        setSignupErrorMessage(messages[0]);
        setShowSignupAlert(true);
      }
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Sign Up</IonTitle>
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
              <IonInput type="text" value={username} onIonChange={e => {updateInformation(e.detail.value!)}}></IonInput>
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
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonButton expand="block" onClick={signup}>Sign up</IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol>
            <p>Already have an account? <a href="/login">Log in</a></p>
          </IonCol>
        </IonRow>
      </IonContent>
      <IonAlert
        isOpen={showSignupAlert}
        onDidDismiss={() => setShowSignupAlert(false)}
        cssClass='my-custom-class'
        header={'Error Creating Account'}
        message={signupErrorMessage}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Signup;