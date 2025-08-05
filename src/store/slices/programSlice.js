import { createSlice } from "@reduxjs/toolkit";
import { programService } from "@/services/api/programService";

const initialState = {
  programs: [],
  currentProgram: null,
  loading: false,
  error: null,
};

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setProgramsSuccess: (state, action) => {
      state.programs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProgramSuccess: (state, action) => {
      state.currentProgram = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError, setProgramsSuccess, setProgramSuccess } = programSlice.actions;

export const fetchPrograms = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    const programs = await programService.getAll();
    dispatch(setProgramsSuccess(programs));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchProgramBySlug = (slug) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    const program = await programService.getBySlug(slug);
    dispatch(setProgramSuccess(program));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default programSlice.reducer;