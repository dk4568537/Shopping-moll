import { configureStore } from "@reduxjs/toolkit";
import cartSystem from "./component/redux/cartSystem"

const store = configureStore({
    reducer:{
        user: cartSystem
    }
})
export default store;