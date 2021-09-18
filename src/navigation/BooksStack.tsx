import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BookDetailsScreen, BookListScreen } from '../screens';

const Stack = createNativeStackNavigator();

const BooksStack = () => (
  <Stack.Navigator initialRouteName="BookList" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BookList" component={BookListScreen} />
    <Stack.Screen
      name="BookDetails"
      component={BookDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default BooksStack;
