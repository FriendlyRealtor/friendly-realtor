import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ClientScreen,
  ContinueEducationScreen,
  HomeScreen,
  FeedScreen,
  SettingScreen,
  LocalRestaurantScreen,
  PostScreen,
  TemplateScreen,
} from '../screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import { usePermissions } from '../hooks';
import * as Location from 'expo-location';

const Tab = createBottomTabNavigator();

export const AppTabs = (props) => {
  const { locationStatus } = usePermissions(props.route.params.currentUser);

  const [activeSub, setActiveSub] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (
      props.route.params.user.customerInfo &&
      props.route.params.user.customerInfo.activeSubscriptions &&
      props.route.params.user.customerInfo.activeSubscriptions.length > 0
    ) {
      setActiveSub(true);
    }
  }, [props.route.params.user.customerInfo]);

  useEffect(() => {
    const getLocation = async () => {
      const res = await Location.getCurrentPositionAsync({});
      setLocation(res.coords);
    };

    getLocation();
  }, [locationStatus]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={30} color="#02FDAA" />,
        }}
      />
      <Tab.Screen
        name="Deals"
        component={ClientScreen}
        options={{
          tabBarIcon: () => <Icon name="user" size={30} color="#02FDAA" />,
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: () => <Icon name="plus-circle" size={30} color="black" />,
        }}
      />
      {/*<Tab.Screen
        name="Templates"
        component={TemplateScreen}
        options={{
          tabBarIcon: () => <Icon name="newspaper-o" size={30} color="#02FDAA" />,
        }}
      />*/}
      {/*<Tab.Screen
        name="Learning"
        component={ContinueEducationScreen}
        options={{
          tabBarIcon: () => <Icon name="book" size={30} color="#02FDAA" />,
        }}
      />*/}
      <Tab.Screen
        name="Restaurants"
        options={{
          tabBarIcon: () => <Icon name="delicious" size={30} color="#02FDAA" />,
        }}
      >
        {() => <LocalRestaurantScreen locationStatus={locationStatus} />}
      </Tab.Screen>
      <Tab.Screen
        name="Menu"
        component={SettingScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={
                props.route.params.user.photo
                  ? { uri: props.route.params.user.photo }
                  : require('../../assets/icon.png')
              }
              style={{
                width: 25,
                height: 25,
                borderRadius: 25 / 2,
                borderColor: 'lightgray',
                borderWidth: 2,
                overflow: 'hidden',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
