import {Realm} from '@realm/react';
import { ObjectSchema } from 'realm';

class User extends Realm.Object {
    public static schema = {
        name: 'User',
        properties: {
            id: 'string',
            userName: 'string',
            lastLoggedInDate: 'date',
        },
        primaryKey: 'id',
    }   
    
    id!: string;
  userName!: string;
  lastLoggedInDate!: Date;
}

export default User;