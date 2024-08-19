import { User } from "@/types/entities.type";
import { createSlice } from "@reduxjs/toolkit";
export interface AuthenticationType {
  isAuth: boolean;
  user: User | null;
}
const initialState: AuthenticationType = {
  isAuth: false,
  user: null,
};

export const authenticationSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setLogin: (state, payload: { payload: User; type: string }) => {
      state.isAuth = true;
      state.user = payload.payload;
    },
    setLogout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { setLogin, setLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
