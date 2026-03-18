import React, { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Catalog: undefined;
  Details: { bookId: string }; // Reminder: ONLY pass the ID here!
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const TeamListScreen = lazy(() => import('../screens/teamlist.tsx'));
const BookDetailScreen = lazy(() => import('../screens/team'));

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={TeamListScreen} />
      <Stack.Screen name="Details" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}