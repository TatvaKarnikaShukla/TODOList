import React, {useEffect, useState} from 'react';
import {Alert, Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {saveTask, updateTask} from '../../store/realm';
import {styles} from '../style/Styles';

const AddUpdateTaskScreen = (prop: any) => {
  const {taskData, currentUserId} = prop.route.params || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openDueDate, setOpenDueDate] = useState(false);

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title);
      setDescription(taskData.description);
      setStartDate(new Date(taskData.startDate));
      setDueDate(new Date(taskData.dueDate));
      setStatus(taskData.status);
    }
  }, [taskData]);

  const handleSaveClick = () => {
    
    if (!title || !description || !status || !startDate || !dueDate) {
      Alert.alert("",'Please fill all the details');
      return;
    }else if (startDate > dueDate) {
      Alert.alert("",'Start Date cannot be greater than Due Date');
      return;
    }else if (startDate < new Date()) {
      Alert.alert("",'Start Date cannot be less than current date');
      return;
    }else if (dueDate < new Date()) {
      Alert.alert("",'Due Date cannot be less than current date');
      return;
    }else if (dueDate < startDate) {
      Alert.alert("",'Due Date cannot be less than Start Date');
      return;
    }else{
      if (taskData) {
        updateTask({
          _id: taskData._id,
          title: title,
          description: description,
          status: status,
          startDate: startDate,
          dueDate: dueDate,
          updatedate: new Date(),
        });
      } else {
        saveTask({
          _id: Date.now().toString(),
          title: title,
          description: description,
          status: status,
          startDate: startDate,
          dueDate: dueDate,
          userId: currentUserId,
        });
      }
    }
    setTitle('');
    setDescription('');
    setStartDate(new Date());
    setDueDate(new Date());
    setStatus('');
    prop.navigation.goBack(null);

  };

  return (
    <View style={styles.addTaskStyle}>
      <TextInput
        style={styles.taskInputStyle}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />

      <TextInput
        style={styles.taskInputStyle}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
      />

      <View style={styles.dateContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>StartDate</Text>
          <Text style={styles.title}>DueDate</Text>
        </View>
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            onPress={() => {
              setOpenStartDate(true);
            }}>
            <TextInput
              style={styles.taskInputStyle}
              placeholder="Start Date"
              editable={false}
              value={startDate.toLocaleDateString()}
            />
          </TouchableOpacity>
          <DatePicker
            modal
            style={styles.datePicker}
            date={startDate}
            mode="date"
            open={openStartDate}
            onConfirm={date => {
              setStartDate(date);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setOpenDueDate(true);
            }}>
            <TextInput
              style={styles.taskInputStyle}
              placeholder="Due Date"
              editable={false}
              value={dueDate.toLocaleDateString()}
            />
          </TouchableOpacity>

          <DatePicker
            modal
            style={styles.datePicker}
            date={dueDate}
            mode="date"
            open={openDueDate}
            onConfirm={date => {
              setDueDate(date);
            }}
          />
        </View>
      </View>
      <TextInput
        style={styles.taskInputStyle}
        placeholder="Status"
        value={status}
        onChangeText={text => setStatus(text)}
      />

      <View style={styles.button}>
        <Button
          title="Save"
          color="#f4511e"
          onPress={() => {
            handleSaveClick();
          }}
        />
      </View>
    </View>
  );
};

export default AddUpdateTaskScreen;
