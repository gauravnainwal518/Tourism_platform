import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import guideService from "../../services/guideService";


// Async Thunks (Guide Only)


export const createGuide = createAsyncThunk(
  "guides/create",
  async (guideData, thunkAPI) => {
    try {
      return await guideService.createGuide(guideData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllGuides = createAsyncThunk(
  "guides/getAll",
  async (_, thunkAPI) => {
    try {
      return await guideService.getAllGuides();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getGuideById = createAsyncThunk(
  "guides/getById",
  async (id, thunkAPI) => {
    try {
      return await guideService.getGuideById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Async Thunks (Guide Only) -for view profie in guide dashboard


export const getGuideByUserId = createAsyncThunk(
  "guides/getByUserId",
  async (userId, thunkAPI) => {
    try {
      return await guideService.getGuideByUserId(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateGuide = createAsyncThunk(
  "guides/update",
  async ({ id, guideData }, thunkAPI) => {
    try {
      return await guideService.updateGuide(id, guideData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteGuide = createAsyncThunk(
  "guides/delete",
  async (id, thunkAPI) => {
    try {
      return await guideService.deleteGuide(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPendingGuides = createAsyncThunk(
  "guides/getPending",
  async (_, thunkAPI) => {
    try {
      return await guideService.getPendingGuides();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Slice


const guideSlice = createSlice({
  name: "guides",
  initialState: {
    guides: [],
    selectedGuide: null,
    pendingGuides: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearGuideState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Guide
      .addCase(createGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.guides.push(action.payload);
      })
      .addCase(createGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Guides
      .addCase(getAllGuides.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllGuides.fulfilled, (state, action) => {
        state.loading = false;
        state.guides = action.payload;
      })
      .addCase(getAllGuides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Guide by ID
      .addCase(getGuideById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGuideById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGuide = action.payload;
      })
      .addCase(getGuideById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Guide by User ID
.addCase(getGuideByUserId.pending, (state) => {
  state.loading = true;
})
.addCase(getGuideByUserId.fulfilled, (state, action) => {
  state.loading = false;
  state.selectedGuide = action.payload;
})
.addCase(getGuideByUserId.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


      // Update Guide
      .addCase(updateGuide.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.guides.findIndex((g) => g._id === action.payload._id);
        if (index !== -1) state.guides[index] = action.payload;
        if (state.selectedGuide?._id === action.payload._id) {
          state.selectedGuide = action.payload;
        }
      })
      .addCase(updateGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Guide
      .addCase(deleteGuide.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGuide.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.guides = state.guides.filter((g) => g._id !== action.meta.arg);
      })
      .addCase(deleteGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pending Guides
      .addCase(getPendingGuides.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingGuides.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingGuides = action.payload;
      })
      .addCase(getPendingGuides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGuideState } = guideSlice.actions;
export default guideSlice.reducer;
