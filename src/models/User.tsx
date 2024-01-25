import {Realm} from '@realm/react';
import { ObjectSchema } from 'realm';

class User extends Realm.Object {
    public static schema: ObjectSchema = {
        name: 'User',
        properties: {
            _id: 'objectId',
            userName: 'string',
            lastLoggedInDate: 'date',
        },
        primaryKey: '_id',
    }

    public _id!: Object
    public userName!: string
    public lastLoggedInDate!: Date
   
}

export default User;