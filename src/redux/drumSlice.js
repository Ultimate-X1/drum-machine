import { createSlice } from "@reduxjs/toolkit";

const drumSlice = createSlice({
    name: 'drum',
    initialState: {
        power: true,
        volume: 0.5,
    },
    reducers: {
        togglePower: (state) => {
            state.power = !state.power;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
    },
})

export const {togglePower, setVolume} = drumSlice.actions;
export default drumSlice.reducer;