/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import TodoListScreen from './src/screens/TodoListScreen';
import AddUpdateTaskScreen from './src/screens/AddUpdateTaskScreen';
import { TodoTaskRealmContext } from './store';
import UserScreen from './src/screens/UserScreen';
import User from './src/models/User';
import TodoTask from './src/models/TodoTask';
import realm from './store/realm';

const Stack = createStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
      <Stack.Screen name="AddUpdateTaskScreen" component={AddUpdateTaskScreen} />
    </Stack.Navigator>
  );
}

const UnAuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
}

const App: React.FC = () => {
  const {RealmProvider} = TodoTaskRealmContext;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    setIsAuthenticated(realm.objects(User)?.length > 0);
  }, [])

  return (
    <NavigationContainer>
      <RealmProvider>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={!isAuthenticated ? "UnAuthenticatedStack" : "AuthenticatedStack"}>
          <Stack.Screen name="AuthenticatedStack" component={AuthenticatedStack} />
          <Stack.Screen name="UnAuthenticatedStack" component={UnAuthenticatedStack} />
        </Stack.Navigator>
      </RealmProvider>
    </NavigationContainer>
  )
}

export default App;
