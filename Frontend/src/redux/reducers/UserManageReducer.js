import {SET_USER_MANAGE_LIST} from "../actions/UserManageAction";

const defaultState = {
  userManageList: [],
}

const UserManageReducer = (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_USER_MANAGE_LIST:
      newState.userManageList = action.userManageList;
      return newState;
    default:
      return newState;
  }
}

export default UserManageReducer;