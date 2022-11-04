import { configureStore } from '@reduxjs/toolkit'
import usersInfoReducer from "./reducers/rootReducers"

export default configureStore({
  reducer: {
    count: usersInfoReducer
  },
})