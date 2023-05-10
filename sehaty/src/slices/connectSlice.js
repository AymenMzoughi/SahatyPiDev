import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, role: null },
    reducers: {
        login: {
            reducer: (state, action) => {
                state.isLoggedIn = true;
                state.role = action.payload;
            },
            prepare: (role) => {
                return { payload: role };
            },
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = null;
            localStorage.removeItem('user');
        },
    },
});

export const AuthActions = authSlice.actions;

export const initializeStore = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user?.role || null;
    const isLoggedIn = token ? true : false;
    const preloadedState = {
        auth: {
            isLoggedIn,
            role: userRole,
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
