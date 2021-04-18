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
  IonIcon,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
// import Tabs from '../components/Tabs';
import { checkmark, trash } from 'ionicons/icons'
import api from '../api';
import './Upcoming.css';

const Upcoming: React.FC = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const refreshItems = (event: CustomEvent<RefresherEventDetail>) => {
    api.get(`${api.defaults.baseURL}/items/upcoming`)
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        if (err.response) {
          console.log('got an error loading items');
          console.log(err.response);
        }
      })
      .then(function () {
        event.detail.complete();
      });
  }

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
    api.post(`${api.defaults.baseURL}/${item.pk}/items/delete`)
    .then(res => {
      console.log('item successfully deleled.');
      console.log(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log(`got an error deleting item - id: ${item.pk} | title: ${item.title}`);
        console.log(err.response);
      }
    });
  };

  const completeItem = (item: any) => {
    api.patch(`${api.defaults.baseURL}/items/${item.pk}/`, {
      complete: true
    })
    .then(res => {
      loadItems();
    })
    .catch(err => {
      if (err.response) {
        console.log(`got an error completing item - id: ${item.pk} | title: ${item.title}`);
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
              <IonItem routerLink={`/items/edit/${item['pk']}`}>
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
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshItems}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
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
