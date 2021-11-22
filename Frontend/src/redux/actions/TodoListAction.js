import axios from "axios";

export const CHANGE_INPUT = "changeInput";
export const ADD_ITEM = "addItem";
export const DELETE_ITEM = "deleteItem";
export const GET_LIST = "getList";

export const changeInputAction= (value)=>({type:CHANGE_INPUT,value});

export const addItemAction= ()=>({type:ADD_ITEM});

export const deleteItemAction=(index)=>({type:DELETE_ITEM,index})

export const getListAction = (data)=>({type:GET_LIST,data})

export const getListFromBE = ()=>{
  return (dispatch)=>{
    axios.get('http://127.0.0.1:8080/test/getAll').then((res)=>{  
      const data=res.data;
      dispatch(getListAction(data));
    })
  }
}