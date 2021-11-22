export const SET_SALARY_LIST = "setSalaryList"
export const SET_PAGINATION = "setListPagination"
export const CLEAR_SALARY_LIST = "clearSalaryList"
export const QUERY_SALARY_LIST = "querySalaryList";
export const SET_IS_LOADING = "setIsLoading";
export const SET_IS_MODEL_VISIBLE = "setIsModelVisible";
export const SET_SALARY_ID = "setSalaryId";
export const SET_SALARY_NAME = "setSalaryName";
export const SET_DETAILED_SALARY_LIST = "setDetailedSalaryList";
export const SET_SUMMARY_SALARY = "setSummarySalary"
export const SET_MODAL_TABLE_TYPE = "setModalTableType"

export const setSalaryList = (salaryList) => ({type: SET_SALARY_LIST,salaryList});

export const setPagination=(pagination)=>({type:SET_PAGINATION,pagination});

export const clearSalaryList = () => ({type: CLEAR_SALARY_LIST});

export const queryUserManageList = (isLoading) => ({type: SET_IS_LOADING, isLoading});

export const queryData = (pagination) => {
  return (dispatch) => {
    dispatch(queryUserManageList(true));
    return {type: QUERY_SALARY_LIST, pagination};
  }
};

export const setIsModelVisible = (isModelVisible) => ({type: SET_IS_MODEL_VISIBLE, isModelVisible});

export const setSalaryId = (salaryId) => ({type: SET_SALARY_ID, salaryId});

export const setSalaryName =(salaryName)=>({type:SET_SALARY_NAME,salaryName});

export const setDetailedSalaryList = (detailedSalaryList) => ({type: SET_DETAILED_SALARY_LIST, detailedSalaryList});

export const setSummarySalary = (summarySalary) => ({type: SET_SUMMARY_SALARY, summarySalary});

export const setModalTableType = (modalTableType) => ({type: SET_MODAL_TABLE_TYPE, modalTableType});