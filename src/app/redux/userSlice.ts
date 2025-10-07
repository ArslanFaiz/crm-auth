'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileType {
    name?: string;
    email?: string;
    phone?: string;
    image?: string | null;
    password?: string;
}
const initialState: ProfileType = {
    name: 'James Carter',
    email: 'james.carter@example.com',
    phone: '+1 (555) 123-4567',
    image: null,
    password: 'password123',
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<ProfileType>) => {
            return { ...state, ...action.payload };
        },

    }
});
export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;