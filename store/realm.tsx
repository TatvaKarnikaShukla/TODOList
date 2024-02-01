import Realm from 'realm';
import TodoTask from '../src/models/TodoTask';
import User from '../src/models/User';

const realm = {
  path: '/data/data/com.todolist/files/realmdb.realm',
  schema: [User, TodoTask],
  schemaVersion: 15,
}

export const addUser = async (
  userId: string,
  userName: string,
  lastLoggedInDate: Date,
) => {
  return Realm.open(realm).then(realmConfig => {
    realmConfig.write(() => {
      realmConfig.create('User', {
        id: userId,
        userName: userName,
        lastLoggedInDate: lastLoggedInDate,
      });
    });
    realmConfig.close();
  });
};

export const fetchUsers = async() => {
  return Realm.open(realm).then(realmConfig => {
    const users = realmConfig.objects('User');
    const usersArray = Array.from(users);
    console.log('Users fetched:', usersArray);
    return usersArray;
  })
}



export const fetchTasks = async(userId: User) => {
  return Realm.open(realm)
.then((realm) => {
  
  const user = realm.objectForPrimaryKey('User', userId);

    if (user) {
      const tasks = realm.objects('TodoTask').filtered('userId = $0', user);
      const tasksArray = Array.from(tasks);
      console.log('Tasks fetched:', tasksArray);
      return tasksArray;
    } else {
      console.log('User not found:', userId);
      return [];
    }
})
.catch((error) => {
  console.error('Error fetching tasks:', error);
  return [];
});
};

export const saveTask = async(
  task: Partial<TodoTask>,
) => {
  const realmConfig = await Realm.open(realm);


  try{
    realmConfig.write(() => {
      console.log('Saving task:', task.userId);
      const user = realmConfig.objectForPrimaryKey('User', task.userId);
      if (user){
        realmConfig.create('TodoTask', {
          _id: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
          userId: user,
          startDate: task.startDate,
          dueDate: task.dueDate,
          createdate: new Date(),
          updatedate: new Date(),
        });
  
      }
    });
    console.log('Task saved:');
   } catch (error) {
    console.error('Error saving task:', error);
  } finally{
    realmConfig.close();
  }
};

export const deleteTask = async(taskId: string) => {
  const realmConfig = await Realm.open(realm);
  try {
    realmConfig.write(() => {
      const task = realmConfig.objectForPrimaryKey('TodoTask', taskId);
      if (task) {
        realmConfig.delete(task);
        console.log('Task deleted:', taskId);
      } else {
        console.log('Task not found:', taskId);
      }
    })
  } catch (error) {
    console.log("Error deleting task", error);
  } finally{
    realmConfig.close();
  }
}

export const updateTask = async(
  task: Partial<TodoTask>
) => {
  const realmConfig = await Realm.open(realm);
  try {
    realmConfig.write(() => {
      const taskToUpdate = realmConfig.objectForPrimaryKey('TodoTask', task._id);
      if (taskToUpdate) {
        realmConfig.create('TodoTask', {
          _id: task._id,
          title: task.title || taskToUpdate.title,
          description: task.description || taskToUpdate.description,
          status: task.status || taskToUpdate.status,
          userId: task.userId,
          startDate: task.startDate || taskToUpdate.startDate,
          dueDate: task.dueDate || taskToUpdate.dueDate,
          createdate: task.createdate,
          updatedate: new Date(),
        }, Realm.UpdateMode.Modified);
        console.log('Task updated:', task._id);
      } else {
        console.log('Task not found:', task._id);
      }
    });
  } catch (error) {
    console.error('Error updating task:', error);
  } finally{
    realmConfig.close();
  }
}
