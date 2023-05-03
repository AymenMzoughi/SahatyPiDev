import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

export const AuthActions = authSlice.actions;

export const initializeStore = () => {
    const token = localStorage.getItem('token');
    const preloadedState = {
        auth: {
            isLoggedIn: token ? true : false,
        },
    };

    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState,
    });
};

export const store = initializeStore();
