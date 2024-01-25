import Realm from 'realm';
import TodoTask from '../src/models/TodoTask';
import User from '../src/models/User';

const realm = new Realm({
    path: '/data/data/com.todolist/files/realmdb.realm',
  schema: [User, TodoTask],
  schemaVersion: 0,
});

export default realm;
