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
  IonDatetime
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'
import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import './EditItem.css';

const EditItem: React.FC = () => {
  const history = useHistory();
  const [ item, setItem ] = useState({
    title: '',
    description: '',
    due_date: ''
  });
  const { itemId } = useParams();

  useEffect(() => {
    console.log(itemId);
    loadItem();
  }, [itemId]);

  const loadItem = () => {
    api.get(`${api.defaults.baseURL}/items/${itemId}/`)
    .then(res => {
      console.log(res.data);
      setItem(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log('error loading item data');
        console.log(err.response);
      }
    });
  }

  const save = () => {
    api.post(`${api.defaults.baseURL}/items/${itemId}/`, {
      title: item.title,
      description: item.description,
      due_date: item.due_date
    })
    .then(res => {
      console.log('item updated....return to previous screen');
      console.log(res.data);
      history.push('/upcoming/');
      // return to previous screen
    })
    .catch(err => {
      if (err.response) {
        console.log('error loading item data');
      }
    });
  }

  const setTitle = (title: string) => {
    item.title = title;
  }

  const setDescription = (description: string) => {
    item.description = description;
  }

  const setDueDate = (dueDate: string) => {
    item.due_date = dueDate;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Edit Item</IonTitle>
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
              <IonLabel position="fixed">Title</IonLabel>
              <IonInput type="text" value={item.title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Description</IonLabel>
              <IonInput type="text" value={item.description} onIonChange={e => setDescription(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Due Date</IonLabel>
              <IonDatetime displayFormat="MM/DD/YYYY" min="1994-03-14" max="2012-12-09" value={item.due_date} onIonChange={e => setDueDate(e.detail.value!)}></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding">
          <IonCol>
            <IonButton expand="block" onClick={save}>Save</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EditItem;