import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: '',
        currentCart: []

    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.current = null
            state.token = null
            state.isLoading = false
            state.mes = ''
        },
        clearMessage: (state) => {
            state.mes = ''
        },
        updateCart: (state, action) => {
            const { pid, color, quantity } = action.payload
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
            state.currentCart = updatingCart.map(el => {
                if (el.color === color && el.product?._id === pid) {
                    return { ...el, quantity }
                } else return el
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true
            state.currentCart = action.payload.cart
        });
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false
            state.token = null
            state.mes = 'Login session has expired. Please login again!'
        });
    }
})
export const { login, logout, clearMessage, updateCart } = userSlice.actions

export default userSlice.reducer