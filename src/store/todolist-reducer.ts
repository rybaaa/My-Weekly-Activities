import {FilterType, todolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistType = {
    type: 'REMOVE_TODOLIST'
    todolistID: string
}
type  ChangeTodolistTitleType = {
    type: 'CHANGE_TODOLIST_TITLE'
    title: string
    todolistID: string
}
type ChangeTodolistFilter = {
    type: 'CHANGE_TODOLIST_FILTER'
    todolistID: string
    filter: FilterType
}
type AddTodolistType = {
    type:'ADD_TODOLIST'
    title:string
}

type ActionType = RemoveTodolistType | ChangeTodolistTitleType | ChangeTodolistFilter | AddTodolistType


export const todolistReducer = (todolists: Array<todolistType>, action: ActionType): Array<todolistType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todolists.filter(t => t.id !== action.todolistID)
        case 'CHANGE_TODOLIST_TITLE':
            return todolists.map(t => t.id === action.todolistID ? {...t, title: action.title} : t)
        case "CHANGE_TODOLIST_FILTER":
            return todolists.map(t => t.id === action.todolistID ? {...t, filter: action.filter} : t)
        case "ADD_TODOLIST":
            const newTodolist:todolistType = {id:v1(), title: action.title, filter:'all'}
            return [...todolists, newTodolist]
        default:
            return todolists
    }
}


export const RemoveTodolistAC = (todolistID: string): RemoveTodolistType => ({type: 'REMOVE_TODOLIST', todolistID})
export const ChangeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleType => ({type: "CHANGE_TODOLIST_TITLE",todolistID,title})
export const ChangeTodolistFilterAC = (todolistID: string, filter: FilterType):ChangeTodolistFilter => ({type:'CHANGE_TODOLIST_FILTER', todolistID, filter})
export const AddTodolistAC = (title:string):AddTodolistType => ({type:"ADD_TODOLIST", title})