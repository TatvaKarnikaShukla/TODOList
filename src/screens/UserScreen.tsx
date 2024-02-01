import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {styles} from '../style/Styles';
import {addUser, fetchUsers} from '../../store/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from 'realm';

type UserData = {
  id: string;
  isLoggedIn: boolean;
  lastLoggedInDate: Date;
};

const UserScreen = (props: any) => {
  const [userName, setUserName] = useState('');
  let userId = '';
  let lastLoggedInDate = new Date();
  const handleAddUser = async () => {
    try {
      const users = await fetchUsers();
      console.log(users.length);
  
      if (users.length === 0) {
        // If no users exist, add a new user
        const userId = new Date().getTime().toString();
        const lastLoggedInDate = new Date();
        addUser(userId, userName, lastLoggedInDate);
  
        const user = {
          id: userId,
          userName: userName,
          isLoggedIn: true,
          lastLoggedInDate: lastLoggedInDate,
        };
  
        storeLoggedInUser(user);
        props.navigation.navigate('AuthenticatedStack');
        return;
      } else {
        const existingUser = users.find(user => user.userName === userName);
  
        if (existingUser) {
            storeLoggedInUser({
              id: existingUser.id as string,
              isLoggedIn: true,
              lastLoggedInDate: new Date(),
            });
  
            console.log('User logged in:', existingUser.id);
            props.navigation.navigate('AuthenticatedStack');
        } else {
          const userId = new Date().getTime().toString();
          const lastLoggedInDate = new Date();
          addUser(userId, userName, lastLoggedInDate);
  
          const user = {
            id: userId,
            userName: userName,
            isLoggedIn: true,
            lastLoggedInDate: lastLoggedInDate,
          };
  
          storeLoggedInUser(user);
          props.navigation.navigate('AuthenticatedStack');
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Enter your name to get started with TODO
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Email"
        onChangeText={value => setUserName(value)}
      />
      <View style={styles.button}>
        <Button
          title="Proceed"
          color="#f4511e"
          onPress={() => handleAddUser()}
        />
      </View>
    </View>
  );
};

export default UserScreen;

function storeLoggedInUser(userData: UserData) {
  AsyncStorage.setItem('UserData', JSON.stringify(userData));
}
