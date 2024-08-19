import { RootState } from "@/stores/store";
import { createSlice } from "@reduxjs/toolkit";

export interface SidebarType {
  isOpen: boolean;
}

const initialValue: SidebarType = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialValue,
  reducers: {
    setSidebarToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setSidebarToggle } = sidebarSlice.actions;

export const selectSidebarIsOpen = (state: RootState) => state.sidebar.isOpen;

export default sidebarSlice.reducer;
