import { combineReducers } from "redux";
import TodoListReducer from "./reducers/TodoListReducer";
import SalaryTableReducer from "./reducers/SalaryTableReducer";
import UserManageReducer from "./reducers/UserManageReducer";
import LoginReducer from "./reducers/LoginReducer";

const reducer = combineReducers({
  TodoListReducer,
  SalaryTableReducer,
  UserManageReducer,
  LoginReducer,
});

export default reducer;