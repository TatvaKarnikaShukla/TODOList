import { createRealmContext } from "@realm/react";
import  TodoTask  from "../src/models/TodoTask";
import  User  from "../src/models/User";

export const TodoTaskRealmContext = createRealmContext({ schema: [User, TodoTask] })