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

  const deleteItem = (item: any) => {
    api.delete(`${api.defaults.baseURL}/${item.pk}/items/delete`)
    .then(res => {
      console.log('item successfully deleled.');
      console.log(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log(`got an error deleting item: ${item.pk}`);
        console.log(err.response);
      }
    });
  };

  const completeItem = (item: any) => {
    api.patch(`${api.defaults.baseURL}/${item.pk}/items/`, {
      complete: true
    })
    .then(res => {
      console.log('item successfully completed.');
      console.log(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log(`got an error completing item: ${item.pk}`);
        console.log(err.response);
      }
    });
  };

  const renderItemList = (items: any[]) => {
    if (items.length) {
      return (
        items.map((item, index) => {
          return (
            <IonItemSliding key={index}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={e => deleteItem(item)}>
                  <IonIcon icon={trash} /> Delete
                </IonItemOption>
              </IonItemOptions>
              <IonItem>
                <IonLabel>{item['title']}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={e => completeItem(item)}>
                  <IonIcon icon={checkmark} /> Complete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          )
        })
      )
    }

    return (
      <div slot="fixed" className="ion-text-center no-upcoming-items">
        <h4>No Upcoming Items</h4>
      </div>
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
