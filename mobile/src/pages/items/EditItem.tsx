import React, { useEffect, useState } from 'react';
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonRow,
  IonCol,
  IonDatetime
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { format } from "date-fns";
import api from '../../api';
import './EditItem.css';

const EditItem: React.FC = () => {
  const history = useHistory();
  const [ item, setItem ] = useState({
    title: '',
    description: '',
    due_date: ''
  });

  const { id } = useParams<{id?: string}>();

  useEffect(() => {
    api.get(`${api.defaults.baseURL}/items/${id}/`)
    .then(res => {
      setItem(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log('error loading item data');
        console.log(err.response);
      }
    });
  }, [id]);

  const save = () => {
    api.patch(`${api.defaults.baseURL}/items/${id}/`, {
      title: item.title,
      description: item.description,
      due_date: item.due_date
    })
    .then(res => {
      history.push('/items/');
    })
    .catch(err => {
      if (err.response) {
        console.log('error saving item data');
        console.log(err.response.data);
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
    item.due_date = format(new Date(dueDate), "yyyy-MM-dd");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/items" />
            </IonButtons>
            <IonTitle>Edit Item</IonTitle>
          </IonToolbar>
        </IonHeader>
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
              <IonTextarea rows={5} value={item.description} onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Due Date</IonLabel>
              <IonDatetime displayFormat="MM/DD/YYYY" value={item.due_date} onIonChange={e => setDueDate(e.detail.value!)}></IonDatetime>
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