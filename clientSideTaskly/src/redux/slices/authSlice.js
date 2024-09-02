import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  isSideBarOpen: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

    //   console.log(action.payload.status);
    //   if (action.payload.status) {
    //     navigate("/dashboard");
    //   }
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },

    toggleSideBar(state, action) {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, toggleSideBar } = authSlice.actions;

export default authSlice.reducer;
