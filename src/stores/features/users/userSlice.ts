import { User } from "@/types/entities.type";
import { createSlice } from "@reduxjs/toolkit";
export interface UserType {
  users: User[] | null;
}
const initialState: UserType = {
  users: null,
};

export const userSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setUsers: (state, payload: { payload: User[]; type: string }) => {
      state.users = payload.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
