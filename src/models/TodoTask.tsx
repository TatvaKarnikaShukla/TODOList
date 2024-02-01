import { Realm } from '@realm/react';
import { User } from 'realm';

class TodoTask extends Realm.Object {
  public static schema = {
    name: 'TodoTask',
    properties: {
      _id: 'string',
      title: 'string',
      description: 'string',
      status: 'string',
      userId: 'User',
      startDate: 'date',
      dueDate: 'date',
      createdate: 'date',
      updatedate: 'date',
    },
    primaryKey: '_id',
  }   
  _id!: string;
  title!: string;
  description!: string;
  status!: string;
  userId!: User;
  startDate!: Date;
  dueDate!: Date;
  createdate!: Date;
  updatedate!: Date;
}

export default TodoTask;
