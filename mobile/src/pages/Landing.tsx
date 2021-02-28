import React from 'react';
import {  IonContent, IonPage, IonIcon } from '@ionic/react';
import { checkmarkDone } from 'ionicons/icons'
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <IonPage className="landing-page">
      <IonContent>
        <h1>C-lister <IonIcon icon={checkmarkDone} /></h1>
        <p>Check those things off the list.</p>
        <h5 className="sign-up"><a href="/signup">Create an Account</a></h5>
        <p className="log-in">Already have an account? <a href="/login">Log in</a></p>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
