import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ConfigState {
  theme: 'light' | 'dark';
  
}


const initialState: ConfigState = {
  theme: 'light', 
};


export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});


export const { toggleTheme, setTheme } = configSlice.actions;

export default configSlice.reducer;