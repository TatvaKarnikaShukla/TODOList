/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import TodoListScreen from './src/screens/TodoListScreen';
import AddUpdateTaskScreen from './src/screens/AddUpdateTaskScreen';
import {TodoTaskRealmContext} from './store';
import UserScreen from './src/screens/UserScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todo List"
        component={TodoListScreen}
        options={{headerShown: true, headerLeft: () => null}}
      />
      <Stack.Screen name="Add Task" component={AddUpdateTaskScreen} />
    </Stack.Navigator>
  );
};

const UnAuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const {RealmProvider} = TodoTaskRealmContext;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      try {
        const userItem = await AsyncStorage.getItem('UserData');
        const user = userItem ? JSON.parse(userItem) : null;

        if (user != null && user.isLoggedIn == true) {
          user.lastLoggedInDate = new Date();
          await AsyncStorage.setItem('UserData', JSON.stringify(user));
          setIsAuthenticated(user.isLoggedIn);
        } else {
          setIsAuthenticated(false);
        }
        console.log(isAuthenticated);
        console.log(user);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkIsAuthenticated();
  }, []);
  return (
    <NavigationContainer>
      <RealmProvider>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={
            isAuthenticated ? 'AuthenticatedStack' : 'UnAuthenticatedStack'
          }>
          <Stack.Screen
            name="AuthenticatedStack"
            component={AuthenticatedStack}
          />
          <Stack.Screen
            name="UnAuthenticatedStack"
            component={UnAuthenticatedStack}
          />
        </Stack.Navigator>
      </RealmProvider>
    </NavigationContainer>
  );
};

export default App;
