import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as StoreProvider} from 'react-redux';

import Posts from './screens/Posts/Posts';
import Post from './screens/Post/Post';
import store from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
