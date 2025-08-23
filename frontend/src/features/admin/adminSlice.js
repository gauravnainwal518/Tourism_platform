import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, removeToken, getToken } from "../../utils/token";
import { API } from "../../utils/apiConfig";

//Admin Login 
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API.ADMIN}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success)
        return rejectWithValue(data.message || "Login failed");

      // Save token + user (instead of admin) 
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { token: data.token, user: data.user };
    } catch (err) {
      return rejectWithValue(err.message || "Server error");
    }
  }
);

//  Helper for authenticated fetch 
const fetchWithAuth = async (url, method = "GET") => {
  const token = getToken();
  if (!token) throw new Error("Token not found");

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok || !data.success)
    throw new Error(data.message || "Request failed");
  return data;
};

//  Fetch Pending Guides 
export const fetchPendingGuides = createAsyncThunk(
  "admin/fetchPendingGuides",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWithAuth(`${API.ADMIN}/pending-guides`);
      return data.guides;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch Pending Homestays 
export const fetchPendingHomestays = createAsyncThunk(
  "admin/fetchPendingHomestays",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWithAuth(`${API.ADMIN}/pending-homestays`);
      return data.homestays;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//  Approve / Reject Guides & Homestays 
const asyncPatch = (url) =>
  createAsyncThunk(url, async (id, { rejectWithValue }) => {
    try {
      await fetchWithAuth(`${API.ADMIN}/${url}/${id}`, "PATCH");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  });

export const approveGuideAsync = asyncPatch("approve-guide");
export const rejectGuideAsync = asyncPatch("reject-guide");
export const approveHomestay = asyncPatch("approve-homestay");
export const rejectHomestay = asyncPatch("reject-homestay");

//  Slice 
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, //unified with normal user
    loginLoading: false,
    guidesLoading: false,
    homestaysLoading: false,
    pendingGuides: [],
    pendingHomestays: [],
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.user = null;
      removeToken();
      localStorage.removeItem("user");
    },
    setAdminFromStorage: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user; // unified
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload;
      })

      // Guides
      .addCase(fetchPendingGuides.pending, (state) => {
        state.guidesLoading = true;
        state.error = null;
      })
      .addCase(fetchPendingGuides.fulfilled, (state, action) => {
        state.guidesLoading = false;
        state.pendingGuides = action.payload;
      })
      .addCase(fetchPendingGuides.rejected, (state, action) => {
        state.guidesLoading = false;
        state.error = action.payload;
      })
      .addCase(approveGuideAsync.fulfilled, (state, action) => {
        state.pendingGuides = state.pendingGuides.filter(
          (g) => g._id !== action.payload
        );
      })
      .addCase(rejectGuideAsync.fulfilled, (state, action) => {
        state.pendingGuides = state.pendingGuides.filter(
          (g) => g._id !== action.payload
        );
      })

      // Homestays
      .addCase(fetchPendingHomestays.pending, (state) => {
        state.homestaysLoading = true;
        state.error = null;
      })
      .addCase(fetchPendingHomestays.fulfilled, (state, action) => {
        state.homestaysLoading = false;
        state.pendingHomestays = action.payload;
      })
      .addCase(fetchPendingHomestays.rejected, (state, action) => {
        state.homestaysLoading = false;
        state.error = action.payload;
      })
      .addCase(approveHomestay.fulfilled, (state, action) => {
        state.pendingHomestays = state.pendingHomestays.filter(
          (h) => h._id !== action.payload
        );
      })
      .addCase(rejectHomestay.fulfilled, (state, action) => {
        state.pendingHomestays = state.pendingHomestays.filter(
          (h) => h._id !== action.payload
        );
      });
  },
});

export const { logoutAdmin, setAdminFromStorage } = adminSlice.actions;
export default adminSlice.reducer;
