import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>C-lister</h1>
        <p>Check those things off the list.</p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
