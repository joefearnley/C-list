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
import api from '../api';
import './Settings.css';

const Settings: React.FC = () => {
  const history = useHistory();

  const [ account, setAccount ] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [ password, setPassword ] = useState<string>();
  const [ confirmPassword, setConfirmPassword ] = useState<string>();

  const loadAccountInfo = () => {
    api.get(`${api.defaults.baseURL}/account/`)
    .then(res => {
      console.log(res.data);
  
      setAccount(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data);
      }
    });
  }

  const setEmail = (email: string) => {
    account.email = email;
    account.username = email;
  }

  const updateEmail = () => {
    console.log('Updating email....');
  }

  const updatePassword = () => {
    // api.post(`${api.defaults.baseURL}/account/${account.id}/change-password/`, {
    //   account.password,
    //   account.confirm_password
    // })
    // .then(res => {
    //   localStorage.setItem('auth_token', res.data.token);
    //   history.push('/upcoming/');
    // })
    // .catch(err => {
    //   if (err.response) {
    //     console.log(err.response.data);
    //   }
    // });
  }


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
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Email</IonLabel>
              <IonInput type="text" value={account.email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol>
            <IonButton expand="block" onClick={updateEmail}>Update Email</IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Change Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
              <IonInput type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol>
            <IonButton expand="block" onClick={updatePassword}>Update Password</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
