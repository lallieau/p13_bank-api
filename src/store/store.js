import {configureStore, createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    token: null,
    isLoggedIn: false,
    user: {},
    isError: '',
    isUpdated: false,
  },
  reducers: {
    fetching: draft => {
      draft.isLoading = true;
    },
    resolvedToken: (draft, action) => {
      draft.isLoading = false;
      draft.isLoggedIn = true;
      draft.token = action.payload;
      draft.isError = '';
    },
    rejectedToken: (draft, action) => {
      draft.isLoading = false;
      draft.isLoggedIn = false;
      draft.token = null;
      draft.isError = action.payload;
    },
    resolvedUser: (draft, action) => {
      draft.isLoading = false;
      draft.user = action.payload;
      draft.isError = '';
    },
    rejectedUser: (draft, action) => {
      draft.isLoading = false;
      draft.user = {};
      draft.isError = action.payload;
    },
    resetAuth: draft => {
      draft.isLoading = false;
      draft.isUpdated = false;
      draft.token = null;
      draft.isLoggedIn = false;
      draft.user = {};
      draft.isError = '';
    },
    updateSuccess: (draft, action) => {
      draft.isLoading = false;
      draft.isUpdated = true;
      draft.user = action.payload;
      draft.isError = '';
    },
    updateFail: draft => {
      draft.isLoading = false;
      draft.isUpdated = false;
    },
  },
});

export const {
  fetching,
  resolvedToken,
  rejectedToken,
  resolvedUser,
  rejectedUser,
  resetAuth,
  updateSuccess,
  updateFail,
} = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export const selectAuth = state => state.auth;
