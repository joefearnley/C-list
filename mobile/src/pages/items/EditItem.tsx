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
  IonAlert
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'
import { useHistory, useParams } from 'react-router-dom';
import api from '../../api';
import './EditItem.css';

const EditItem: React.FC = () => {
  const history = useHistory();
  const [ item, setItem ] = useState({});
  // const [title, setTitle] = useState<string>();
  // const [description, setDescription] = useState<string>();
  // const [date, setDate] = useState<string>();
  let { itemId } = useParams();

  useEffect(() => {
    console.log(itemId);
    loadItem();
  }, []);

  const loadItem = () => {
    api.get(`${api.defaults.baseURL}/items/${itemId}/`)
    .then(res => {
      console.log(res.data);
      setItem(res.data);
    })
    .catch(err => {
      if (err.response) {
        console.log('error loading item data');
      }
    });
  }

  const save = () => {
    api.post(`${api.defaults.baseURL}/items/${itemId}/`, {
      title: item.title,
      description: item.description,
      duedate: item.duedate
    })
    .then(res => {
      console.log(res.data);

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
            <IonTitle>edti </IonTitle>
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
              <IonLabel position="fixed">Username</IonLabel>
              <IonInput type="text" value={item.title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-horizontal">
          <IonCol>
            <IonItem>
              <IonLabel position="fixed">Password</IonLabel>
              <IonInput type="password" value={item.description} onIonChange={e => setDescription(e.detail.value!)}></IonInput>
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