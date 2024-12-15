import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Simulated API for login
const fakeAuthAPI = async (credentials) => {
  const { username, password } = credentials;
  // Simulate a server response
  if (username === "admin" && password === "admin123") {
    return { username: "admin", role: "Admin", token: "fake-jwt-token" };
  } else if (username === "doctor" && password === "doctor123") {
    return { username: "doctor", role: "Doctor", token: "fake-jwt-token" };
  } else if (username === "receptionist" && password === "receptionist123") {
    return {
      username: "receptionist",
      role: "Receptionist",
      token: "fake-jwt-token",
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    console.log("login auth");
    try {
      const user = await fakeAuthAPI(credentials);
      console.log({ user });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: false,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.error = false;
      state.loading = false;
      state.role = null;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("login.pending");
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("login.fulfilled");
        state.error = action.payload;
        state.loading = false;
        state.role = null;
        state.user = null;
        state.token = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login.rejected");
        state.loading = false;
        state.role = action.payload.role;
        state.user = action.payload.username;
        state.token = action.payload.token;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
