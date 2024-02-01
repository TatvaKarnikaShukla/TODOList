import { User } from "realm"
import TodoTask from "../models/TodoTask"

export type RootStackParamList = {
    TodoListScreen: undefined
    AddUpdateTaskScreen: {
        taskData?: TodoTask
        currentUserId?: User
    }
    UserScreen: undefined
}