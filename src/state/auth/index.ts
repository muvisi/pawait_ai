//Ducks Pattern

//createSlice is the main api for redux logic
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, signUp } from '../../services/login';
interface authProps {
  access_token: string;
  username: string;
  email: string;
  id: string;
}

interface stateProps {
  auth: authProps | null;
  isAuthStateError: boolean;
  isAuthStateSuccess: boolean;
  isAuthStateLoading: boolean;
  authStateMessage: string;
}

// shape of the state
const initialState: stateProps = {
  auth: null,
  isAuthStateError: false,
  isAuthStateSuccess: false,
  isAuthStateLoading: false,
  authStateMessage: '',
};

export const loginUser: any = createAsyncThunk(
  'user/login',
  async (data: {
    payload: { username_or_email: string; password: string };
    callback: any;
    errorMessage: any;
  }) => {
    const { payload, callback, errorMessage } = data;
    try {
      const response = await login(payload);
      callback(response);
      // console.log('my response', response);
      return response;
    } catch (error: any) {
      errorMessage(error?.response?.data);
    }
  }
);

export const register: any = createAsyncThunk(
  'user/signUp',
  async (data: {
    payload: {
      email: string;
      username: string;
      password: any;
    };
    callback: any;
    errorMessage: any;
  }) => {
    const { payload, callback, errorMessage } = data;
    try {
      const response = await signUp(payload);
      callback(response);
      return response;
    } catch (error: any) {
      console.log('my errors', error);
      errorMessage(error?.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isAuthStateLoading = false;
      state.isAuthStateError = false;
      state.isAuthStateSuccess = false;
      state.authStateMessage = '';
      state.auth = null;
    },
  },

  // export const
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthStateLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthStateLoading = false;
        state.isAuthStateSuccess = true;
        state.auth = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isAuthStateLoading = false;
        state.isAuthStateError = true;
        state.authStateMessage = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
