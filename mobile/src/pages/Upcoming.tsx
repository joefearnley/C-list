import React, { useState } from 'react';
import {
  useIonViewWillLeave,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon
} from '@ionic/react';
import Tabs from '../components/Tabs';
import { checkmark, trash } from 'ionicons/icons'  
import api from '../api';
import './Upcoming.css';

const Upcoming: React.FC = () => {

  useIonViewWillLeave(() => {
    console.log('ionViewWillLeave event fired');
  });

  // const loadItems = () => {
  //   const [items, setItems] = useState([]);
  
  //   api.post(`${api.defaults.baseURL}/items/upcoming`)
  //   .then(res => {
  //     setItems(res.data.items);
  //   })
  //   .catch(err => {
  //     if (err.response) {
  //       console.log('got an error loading items');
  //       console.log(err.response);
  //     }
  //   });
  // }

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
            <IonTitle>Upcoming</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {items.map(item => (
          <IonItemSliding>
            <IonItemOptions side="start">
              <IonItemOption color="danger" onClick={() => console.log('share clicked')}>
                <IonIcon icon={trash} /> Delete
              </IonItemOption>
            </IonItemOptions>

            <IonItem>
              <IonLabel>item.title</IonLabel>
            </IonItem>

            <IonItemOptions side="end">
              <IonItemOption onClick={() => console.log('unread clicked')}>
                <IonIcon icon={checkmark} /> Complete
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
          ))}
        </IonList>
      </IonContent>

    </IonPage>
  );
};

export default Upcoming;
