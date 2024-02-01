import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TodoListItemComponent from '../components/TodoListItemComponent';
import TodoTask from '../models/TodoTask';
import {styles} from '../style/Styles';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {deleteTask, fetchTasks, saveTask} from '../../store/realm';
import {useFocusEffect} from '@react-navigation/native';
import * as ProgressBar from 'react-native-progress';

const TodoListScreen = (prop: any) => {
  const [taskList, setTaskList] = useState(new Array());
  const [task, setTask] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getTaskList();
    },[])
  )

  useEffect(() => {
    prop.navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="add"
          size={24}
          color="black"
          onPress={() => {
            console.log('Add Task', currentUserId);
            prop.navigation.navigate('Add Task', {
              currentUserId: currentUserId,
            });
          }}
          style={{marginRight: 10}}
        />
      ),
    });
    getTaskList();
  }, [currentUserId]);
  const getTaskList = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('UserData');
    const user = userData ? JSON.parse(userData) : null;
    if (user != null) {
      console.log(user.id);
      setCurrentUserId(user.id);
    }
    const dbResult = await fetchTasks(user.id);
    if (dbResult != null) {
      console.log(dbResult);
      setTaskList(dbResult);
      setLoading(false);
    }else{
      console.log('No tasks found');
      setTaskList([]);
      setLoading(false);
    }
  };

  const deleteItemFromDb = (taskId: string) => {
    deleteTask(taskId);
    getTaskList();
    setLoading(false);
  }
  const deleteItem = (taskData: TodoTask) => {
    console.log('delete item');
    Alert.alert(
      'Delete',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {console.log('OK Pressed')
        setLoading(true)
       deleteItemFromDb(taskData._id)}},
      ]
    )
  }

  const updateItem = (taskData: TodoTask) => {
    console.log('update item');
    console.log(taskData);
    prop.navigation.navigate('Add Task', {
      taskData: {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        userId: taskData.userId,
        startDate: taskData.startDate.toISOString(),
        dueDate: taskData.dueDate.toISOString(),
        createdate: taskData.createdate.toISOString(),
        updatedate: taskData.updatedate.toISOString(),
        _id: taskData._id
      },
      currentUserId: currentUserId,
    })
  }


  return (
    <View>
      {isLoading && <ProgressBar.Circle progress={0.5} color="#f4511e" indeterminate={true} style={styles.progressBar}/>}
      {(taskList.length === 0 && !isLoading) ? (
        <View style={styles.noTaskStyle}>
          <Image
            source={require('../images/no_task.png')}
            style={styles.noTaskImage}
          />
          <Text style={styles.noTaskText}>No tasks found</Text>
        </View>
      ) : (
        <FlatList
          data={taskList}
          renderItem={({item}) => <TodoListItemComponent taskData={item} 
            onDelete={(task) => deleteItem(task)} 
            onUpdate={(task) => {
              console.log('update item', task)
              updateItem(task)}}
          />}
        />
      )}
    </View>
  );
};

export default TodoListScreen;
