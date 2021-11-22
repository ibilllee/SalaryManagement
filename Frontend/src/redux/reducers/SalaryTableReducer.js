import {
  SET_IS_LOADING,
  QUERY_SALARY_LIST,
  SET_IS_MODEL_VISIBLE,
  SET_DETAILED_SALARY_LIST,
  SET_SUMMARY_SALARY,
  SET_MODAL_TABLE_TYPE, SET_SALARY_ID, CLEAR_SALARY_LIST, SET_SALARY_LIST, SET_PAGINATION, SET_SALARY_NAME,
} from "../actions/SalaryTableAction";
import {MONTHLY_SALARY, NORMAL_SALARY} from "../../constant";

const defaultState = {
  loading: false,
  pagination: {
    current: 1,
    pageSize: 10,
  },
  salaryId: 0,
  salaryName: '',
  isModelVisible: false,
  modalTableType: MONTHLY_SALARY, //monthly or normal
  detailedSalaryList: [],
  summarySalary: {},
  salaryList: [],
};

const SalaryTableReducer = (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_IS_LOADING:
      newState.inputValue = action.isLoading;
      return newState;
    case SET_SALARY_LIST:
      newState.salaryList = action.salaryList;
      return newState;
    case SET_PAGINATION:
      newState.pagination=action.pagination;
      return newState;
    case CLEAR_SALARY_LIST:
      newState.salaryList = [];
      return newState;
    case QUERY_SALARY_LIST:
      return newState;
    case SET_SALARY_ID:
      newState.salaryId = action.salaryId;
      return newState;
    case SET_SALARY_NAME:
      newState.salaryName = action.salaryName;
      return newState;
    case SET_IS_MODEL_VISIBLE:
      newState.isModelVisible = action.isModelVisible;
      return newState;
    case SET_DETAILED_SALARY_LIST:
      newState.detailedSalaryList = action.detailedSalaryList;
      return newState;
    case SET_SUMMARY_SALARY:
      newState.summarySalary = action.summarySalary;
      return newState;
    case SET_MODAL_TABLE_TYPE:
      if (
        action.modalTableType !== MONTHLY_SALARY &&
        action.modalTableType !== NORMAL_SALARY
      ) {
        newState.modalTableType = NORMAL_SALARY;
      } else {
        newState.modalTableType = action.modalTableType;
      }
      return newState;
    default:
      return state;
  }
};

export default SalaryTableReducer;
