import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions

export default counterSlice.reducer