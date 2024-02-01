import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import TodoTask from '../models/TodoTask';
import {Swipeable} from 'react-native-gesture-handler';
import { styles } from '../style/Styles';
import { deleteTask } from '../../store/realm';

const TodoListItemComponent: React.FC<{taskData: TodoTask,onDelete: (task: TodoTask) => void, onUpdate: (task: TodoTask) => void}> = ({taskData, onDelete, onUpdate}) => {
  
  return (
    <Swipeable renderLeftActions={() => 
    <TouchableOpacity style={styles.deleteActionButtonStyle} onPress={() => onDelete(taskData)}>
        <Text style={styles.actionButtonTextStyle}>Delete</Text>    
    </TouchableOpacity>
    }
    renderRightActions={() =>
    <TouchableOpacity style={styles.updateActionButtonStyle} onPress={() => onUpdate(taskData)}>
        <Text style={styles.actionButtonTextStyle}>Update</Text>    
    </TouchableOpacity>
    }
    >
      <View style={styles.itemCardBackground}>
        <Text style={styles.cardItemTextStyle}>Title: {taskData.title}</Text>
        <Text style={styles.cardItemTextStyle}>Description: {taskData.description}</Text>
        <Text style={styles.cardItemTextStyle}>Status: {taskData.status}</Text>
        <Text style={styles.cardItemTextStyle}>Start Date: {taskData.startDate.toLocaleDateString()}</Text>
        <Text style={styles.cardItemTextStyle}>Due Date:{taskData.dueDate.toLocaleDateString()}</Text>
        <Text style={styles.cardItemTextStyle}>Created Date: {taskData.createdate.toLocaleDateString()}</Text>
        <Text style={styles.cardItemTextStyle}>Updated Date: {taskData.updatedate.toLocaleDateString()}</Text>
      </View>
    </Swipeable>
  );
};

export default TodoListItemComponent;
