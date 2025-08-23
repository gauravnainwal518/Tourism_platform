
//future use
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  center: [30.0668, 79.0193], // Default to Uttarakhand coordinates
  zoom: 7,
  selectedLocation: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCenter(state, action) {
      state.center = action.payload;
    },
    setZoom(state, action) {
      state.zoom = action.payload;
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    resetMap(state) {
      state.center = [30.0668, 79.0193];
      state.zoom = 7;
      state.selectedLocation = null;
    },
  },
});

export const { setCenter, setZoom, setSelectedLocation, resetMap } =
  mapSlice.actions;
export default mapSlice.reducer;
