import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CharacterListScreen, CharacterDetailsScreen } from '../screens';

const Stack = createNativeStackNavigator();

const CharactersStack = () => (
  <Stack.Navigator initialRouteName="CharacterList" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CharacterList" component={CharacterListScreen} />
    <Stack.Screen
      name="CharacterDetails"
      component={CharacterDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default CharactersStack;
