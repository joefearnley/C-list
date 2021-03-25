import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import Tabs from '../components/Tabs';
import './Upcoming.css';

const Upcoming: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upcoming</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle >Upcoming</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Item 1</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Item 2</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Item 2</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

    </IonPage>
  );
};

export default Upcoming;
