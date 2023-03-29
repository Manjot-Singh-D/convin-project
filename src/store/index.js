import { configureStore } from "@reduxjs/toolkit";

import {userSlice} from "./slices/userSlices";
import { historySlice } from "./slices/historySlices";

const store=configureStore({
    reducer:{
        users:userSlice.reducer,
        history:historySlice.reducer,
    }
})

export default store;