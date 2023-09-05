import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app.reducer";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums";
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  const res = await authAPI.login(arg);
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    if (res.data.resultCode === 10) {
      dispatch(getCaptchaURL());
    }
    const isShowAppError = !res.data.fieldsErrors.length;
    return rejectWithValue({ data: res.data, showGlobalError: isShowAppError });
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: true });
  }
});

const getCaptchaURL = createAppAsyncThunk<{captcha: string}, void>("auth/getCaptchaURL", async(_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
    const res = await authAPI.getCaptchaURL()   
    if (res.status === 200) {        
        const captcha = res.data.url
        return {captcha}
    }
      return rejectWithValue(null)
  })

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  }
});

type InitialStateType = {
  isLoggedIn: boolean,
    captchaURL: null | string
}

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captchaURL: null
  } as InitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(getCaptchaURL.fulfilled, (state, action) => {
        state.captchaURL = action.payload.captcha;
      });
  },
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
