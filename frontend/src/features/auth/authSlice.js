import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { setToken, removeToken, getToken } from "../../utils/token";


// Async Thunks


// LOGIN: User or Guide
export const loginUserOrGuide = createAsyncThunk(
  "auth/loginUserOrGuide",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.loginUserOrGuide(email, password);

      if (!data.success) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Save token in localStorage
      if (data.token) setToken(data.token);

      return { user: data.user, token: data.token };
    } catch (error) {
      return rejectWithValue(error.message || "Server error");
    }
  }
);

// REGISTER: User or Guide
export const registerUserOrGuide = createAsyncThunk(
  "auth/registerUserOrGuide",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.registerUserOrGuide(userData);

      if (!data.success) {
        return rejectWithValue(data.message || "Registration failed");
      }

      if (data.token) setToken(data.token);

      return { user: data.user, token: data.token };
    } catch (error) {
      return rejectWithValue(error.message || "Server error");
    }
  }
);


// Initial State


let userFromStorage = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    userFromStorage = JSON.parse(storedUser);
  }
} catch (err) {
  console.warn("Failed to parse user from localStorage:", err);
  userFromStorage = null;
}

const initialState = {
  user: userFromStorage,
  token: getToken() || null,
  isAuthenticated: !!getToken(),
  loading: false,
  error: null,
};


// Slice


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeToken();
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUserOrGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserOrGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUserOrGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUserOrGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserOrGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUserOrGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
