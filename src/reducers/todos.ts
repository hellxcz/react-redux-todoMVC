import {handleActions, Action} from 'redux-actions';
import * as Actions from '../constants/actions';

const initialState: TodoStoreState = [{
  id: 0,
  text: 'Use Redux',
  completed: false
}];

export default handleActions<TodoStoreState, TodoItemData>({
  [Actions.ADD_TODO]: (state: TodoStoreState, action: Action<TodoItemData>): TodoStoreState => {
    return [{
      id: state.reduce(
        (maxId: number, todo: TodoItemData) => {
          return Math.max(todo.id, maxId);
        }, -1) + 1,
      completed: false,
      ...action.payload,
    }, ...state];
  },

  [Actions.DELETE_TODO]: (state: TodoStoreState, action: Action<TodoItemData>): TodoStoreState => {
    return state.filter((todo : TodoItemData) => todo.id !== action.payload);
  },

  [Actions.EDIT_TODO]: (state: TodoStoreState, action: Action<TodoItemData>) => {
    return state.map((todo: TodoItemData) => {
      return todo.id === action.payload.id
        ? {...todo, text: action.payload.text}
        : todo;
    });
  },

  [Actions.COMPLETE_TODO]: (state: TodoStoreState, action: Action<TodoItemData>): TodoStoreState => {
    return state.map((todo: TodoItemData) => {
      return todo.id === action.payload
        ? {...todo, completed: !todo.completed}
        : todo;
    });
  },

  [Actions.COMPLETE_ALL]: (state: TodoStoreState, action: Action<TodoItemData>): TodoStoreState => {
    const areAllMarked = state.every((todo: TodoItemData) => todo.completed);
    return state.map((todo: TodoItemData) => {
      return {
        ...todo,
        completed: !areAllMarked
      };
    });
  },

  [Actions.CLEAR_COMPLETED]: (state: TodoStoreState, action: Action<TodoItemData>): TodoStoreState => {
    return state.filter((todo: TodoItemData) => todo.completed === false);
  }
}, initialState);
