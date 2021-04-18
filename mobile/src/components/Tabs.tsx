import React from 'react';
import { Route } from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
  } from '@ionic/react';
import { alarm, list, settings } from 'ionicons/icons';
import Upcoming from '../pages/Upcoming';
import Items from '../pages/Items';
import Settings from '../pages/Settings';

const Tabs: React.FC = () => {
  return (
    <>
      <IonTabs>
          <IonRouterOutlet>
              <Route path="/upcoming" component={Upcoming} exact={true} />
              <Route path="/items" component={Items} exact={true} />
              <Route path="/settings" component={Settings} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
          <IonTabButton tab="upcoming" href="/upcoming">
              <IonIcon icon={alarm} />
              <IonLabel>Upcoming</IonLabel>
          </IonTabButton>
          <IonTabButton tab="items" href="/items">
              <IonIcon icon={list} />
              <IonLabel>Items</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
          </IonTabButton>
          </IonTabBar>
      </IonTabs>
    </>
  );
};

export default Tabs;