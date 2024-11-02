import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocal, setUser, removeUserFromLocal } from "../../hooks/localStorage";



export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: getUserFromLocal()
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      setUser(state.user);
    },
    removeUser: (state, action) => {
      state.user = null;
      removeUserFromLocal();
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;