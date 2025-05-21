
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  sso_id: string;
  username: string;
  email: string;
  image: string;
}

const initialState: UserState | null = JSON.parse(localStorage.getItem("user") || "null");

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    clearUser() {
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
