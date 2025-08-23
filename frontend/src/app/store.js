import { configureStore } from '@reduxjs/toolkit';

// feature slices
import authReducer from '../features/auth/authSlice';
import bookingReducer from '../features/bookings/bookingSlice';
import adminReducer from '../features/admin/adminSlice';
import guideReducer from '../features/guide/guideSlice';
import homestayReducer from '../features/homestays/homestaySlice';
import mapReducer from '../features/map/mapSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    admin: adminReducer,
    guide: guideReducer,
    homestays: homestayReducer,
    map: mapReducer,
  },
});
