import { Realm } from '@realm/react';
import { ObjectSchema } from 'realm';

class TodoTask extends Realm.Object {
  public static schema: ObjectSchema = {
    name: 'TodoTask',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
      isDone: 'bool',
      startDate: 'date',
      dueDate: 'date',
      createdate: 'date',
      updatedate: 'date',
    },
    primaryKey: '_id',
  };

  // Properties
  public _id!: Object;
  public title!: string;
  public description!: string;
  public isDone!: boolean;
  public startDate!: Date;
  public dueDate!: Date;
  public createdate!: Date;
  public updatedate!: Date;
}

export default TodoTask;
