import { createSlice } from "@reduxjs/toolkit";
import { authService } from "@/services/api/authService";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
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
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError, loginSuccess, logout } = authSlice.actions;

export const initializeAuth = () => (dispatch) => {
  const savedUser = authService.getCurrentUser();
  if (savedUser) {
    dispatch(loginSuccess(savedUser));
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    const user = await authService.login(credentials);
    dispatch(loginSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, error: error.message };
  }
};

export const signupUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    const user = await authService.signup(userData);
    dispatch(loginSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, error: error.message };
  }
};

export const logoutUser = () => (dispatch) => {
  authService.logout();
  dispatch(logout());
};

export default authSlice.reducer;