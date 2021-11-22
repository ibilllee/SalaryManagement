import {
  ADD_ITEM,
  CHANGE_INPUT,
  DELETE_ITEM,
  GET_LIST,
} from "../actions/TodoListAction";

const defaultState = {
  inputValue: "",
  eventList: [],
};

const TodoListReducer= (state = defaultState, action) => {
  let newState= JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case CHANGE_INPUT:
      newState.inputValue = action.value;
      return newState;
    case ADD_ITEM:
      newState.eventList.push(newState.inputValue);
      newState.inputValue = "";
      return newState;
    case DELETE_ITEM:
      newState.eventList.splice(action.index, 1);
      return newState;
    case GET_LIST:
      newState.eventList = action.data.data;
      return newState;
    default:
      return state;
  }
};

export default TodoListReducer;