import React, { useEffect, useState } from 'react';
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
import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import './EditItem.css';

const EditItem: React.FC = () => {
  const history = useHistory();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const { itemId } = useParams();

  useEffect(() => {
    loadItem();

    console.log(itemId);
  }, []);

  const loadItem = () => {
    api.get(`${api.defaults.baseURL}/items/${itemId}/`)
    .then(res => {
      console.log(res.data);
      setItem(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log('error loading item data');
      }
    });
  }

  const save = () => {

  }

  const setTitle = (title: string) => {
    = title;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>edti </IonTitle>
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
              <IonInput type="text" value={title} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
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
          header={'Log In Failed'}
          message={loginErronMessage}
          buttons={['OK']}
        />
    </IonPage>
  );
};

export default Login;