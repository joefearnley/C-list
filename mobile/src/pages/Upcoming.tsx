import React, { useEffect, useState } from 'react';
import {
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

  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('fetching data.....');
    loadItems();
  }, []);

  const loadItems = () => {
    console.log('loading items....');

    api.get(`${api.defaults.baseURL}/items/upcoming`)
    .then(res => {
      setItems(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log('got an error loading items');
        console.log(err.response);
      }
    });
  }

  const renderItemList = (items: any[]) => {
    if (items.length) {
      return (
        items.map(item => {
          return (
            <IonItemSliding>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={() => console.log('share clicked')}>
                  <IonIcon icon={trash} /> Delete
                </IonItemOption>
              </IonItemOptions>
              <IonItem>
                <IonLabel>{item['title']}</IonLabel>
              </IonItem>
            </IonItemSliding>
          )
        })
      )
    }

    return (
      <p>No Upcoming Items</p>
    )
  };

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
          { renderItemList(items) }
        </IonList>
      </IonContent>

    </IonPage>
  );
};

export default Upcoming;
