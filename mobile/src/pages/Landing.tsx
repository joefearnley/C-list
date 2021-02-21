import React from 'react';
import {  IonContent, IonPage, IonIcon } from '@ionic/react';
import { checkmarkDone } from 'ionicons/icons'
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="landing-page">
        <h1>C-lister <IonIcon icon={checkmarkDone} /></h1>
        <p>Check those things off the list.</p>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
