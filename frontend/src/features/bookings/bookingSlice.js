
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "../../services/bookingService";
import homestayService from "../../services/homestayService";


// Async Thunks


// Fetch all bookings for the logged-in user (guide + homestay)
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (_, thunkAPI) => {
    try {
      return await bookingService.getUserBookings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch bookings for the logged-in guide only
export const fetchGuideBookings = createAsyncThunk(
  "bookings/fetchGuideBookings",
  async (_, thunkAPI) => {
    try {
      return await bookingService.getGuideBookings(); 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch bookings for homestays owned by logged-in user (owner)
export const fetchOwnerHomestayBookings = createAsyncThunk(
  "bookings/fetchOwnerHomestayBookings",
  async (_, thunkAPI) => {
    try {
      return await homestayService.getOwnerHomestayBookings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a new booking (guide or homestay)
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({ type, id, bookingData }, thunkAPI) => {
    try {
      return await bookingService.createBooking(type, id, bookingData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Cancel a booking (guide or homestay)
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async ({ type, bookingId }, thunkAPI) => {
    try {
      return await bookingService.deleteBooking(type, bookingId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update booking status (for guide or owner: accept/reject)
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ bookingId, status }, thunkAPI) => {
    try {
      return await bookingService.updateBookingStatus(bookingId, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Slice


const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    userBookings: [],    // guide + homestay bookings for user
    guideBookings: [],   // guide-specific bookings
    ownerBookings: [],   // homestays owned by user
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // User bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Guide bookings
      .addCase(fetchGuideBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuideBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.guideBookings = action.payload;
      })
      .addCase(fetchGuideBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Owner homestay bookings
      .addCase(fetchOwnerHomestayBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerHomestayBookings.fulfilled, (state, action) => {
        state.loading = false;
         //console.log("[bookingSlice] Payload from API:", action.payload);
        state.ownerBookings = action.payload;
      })
      .addCase(fetchOwnerHomestayBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Add to userBookings array
        state.userBookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        const { bookingId } = action.meta.arg;
        // Remove from all arrays
        state.userBookings = state.userBookings.filter(
          (b) => b._id !== bookingId
        );
        state.guideBookings = state.guideBookings.filter(
          (b) => b._id !== bookingId
        );
        state.ownerBookings = state.ownerBookings.filter(
          (b) => b._id !== bookingId
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update booking status
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        // Update in all arrays
        state.userBookings = state.userBookings.map((b) =>
          b._id === updated._id ? updated : b
        );
        state.guideBookings = state.guideBookings.map((b) =>
          b._id === updated._id ? updated : b
        );
        state.ownerBookings = state.ownerBookings.map((b) =>
          b._id === updated._id ? updated : b
        );
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
