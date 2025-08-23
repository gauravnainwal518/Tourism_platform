
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homestayService from "../../services/homestayService";


// Async Thunks


export const fetchAllHomestays = createAsyncThunk(
  "homestays/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      return await homestayService.getAllHomestays(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOwnerHomestays = createAsyncThunk(
  "homestays/fetchOwner",
  async (token, thunkAPI) => {
    try {
      return await homestayService.getOwnerHomestays(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchHomestayById = createAsyncThunk(
  "homestays/fetchById",
  async ({ id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await homestayService.getHomestayById(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);



export const createNewHomestay = createAsyncThunk(
  "homestays/create",
  async ({ data, token }, thunkAPI) => {
    try {
      return await homestayService.createHomestay(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateExistingHomestay = createAsyncThunk(
  "homestays/update",
  async ({ id, homestayData, token }, thunkAPI) => {
    try {
      return await homestayService.updateHomestay(id, homestayData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteExistingHomestay = createAsyncThunk(
  "homestays/delete",
  async ({ id, token }, thunkAPI) => {
    try {
      return await homestayService.deleteHomestay(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const bookHomestay = createAsyncThunk(
  "homestays/book",
  async ({ id, bookingData, token }, thunkAPI) => {
    try {
      return await homestayService.bookHomestay(id, bookingData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Slice


const homestaySlice = createSlice({
  name: "homestays",
  initialState: {
    homestays: [],
    ownerHomestays: [],     
    selectedHomestay: null,
    loading: false,
    error: null,
    bookingLoading: false,
    bookingError: null,
    bookingSuccess: null,
  },
  reducers: {
    clearSelectedHomestay: (state) => {
      state.selectedHomestay = null;
    },
    clearBookingState: (state) => {
      state.bookingLoading = false;
      state.bookingError = null;
      state.bookingSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Homestays
      .addCase(fetchAllHomestays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHomestays.fulfilled, (state, action) => {
        state.loading = false;
        state.homestays = action.payload;
      })
      .addCase(fetchAllHomestays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Owner Homestays
      .addCase(fetchOwnerHomestays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerHomestays.fulfilled, (state, action) => {
        state.loading = false;
        state.ownerHomestays = action.payload;
      })
      .addCase(fetchOwnerHomestays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchHomestayById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomestayById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHomestay = action.payload;
      })
      .addCase(fetchHomestayById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Homestay
      .addCase(createNewHomestay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewHomestay.fulfilled, (state, action) => {
        state.loading = false;
        state.homestays.push(action.payload);
        state.ownerHomestays.push(action.payload); // also push to owner list
      })
      .addCase(createNewHomestay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Homestay
      .addCase(updateExistingHomestay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingHomestay.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.homestays.findIndex(h => h._id === action.payload._id);
        if (index !== -1) state.homestays[index] = action.payload;

        const ownerIndex = state.ownerHomestays.findIndex(h => h._id === action.payload._id);
        if (ownerIndex !== -1) state.ownerHomestays[ownerIndex] = action.payload;

        if (state.selectedHomestay?._id === action.payload._id) {
          state.selectedHomestay = action.payload;
        }
      })
      .addCase(updateExistingHomestay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Homestay
      .addCase(deleteExistingHomestay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingHomestay.fulfilled, (state, action) => {
        state.loading = false;
        state.homestays = state.homestays.filter(h => h._id !== action.meta.arg.id);
        state.ownerHomestays = state.ownerHomestays.filter(h => h._id !== action.meta.arg.id);
      })
      .addCase(deleteExistingHomestay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Book Homestay
      .addCase(bookHomestay.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = null;
        state.bookingSuccess = null;
      })
      .addCase(bookHomestay.fulfilled, (state) => {
        state.bookingLoading = false;
        state.bookingSuccess = "Homestay booked successfully!";
      })
      .addCase(bookHomestay.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = action.payload;
      });
  },
});


// Export

export const { clearSelectedHomestay, clearBookingState } = homestaySlice.actions;
export default homestaySlice.reducer;
