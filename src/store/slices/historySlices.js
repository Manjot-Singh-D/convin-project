import { createSlice } from "@reduxjs/toolkit";

const historySlice=createSlice({
    name:"history",
    initialState:[],
    reducers:{
        addHistory(state,actions){
            state.push(actions.payload);
        },
        removeHistory(state,actions){
            state.splice(actions.payload,1);
        },
    },
})
export {historySlice};
export const {addHistory,removeHistory}=historySlice.actions;