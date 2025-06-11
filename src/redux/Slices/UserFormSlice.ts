import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  girlDetails: {},
  fatherDetails: {},
  addressDetails: {},
  documentDetails:{}
 
};

const UserFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setGirlDetails: (state, action) => {
      console.log(action.payload,"action")
      state.girlDetails = action.payload;
    },
    setFatherDetails: (state, action) => {
      state.fatherDetails = action.payload;
    },

    setAddreddDetails: (state, action) => {
      state.addressDetails = action.payload;
    },

    setDocumentDetails: (state, action) => {
      state.documentDetails = action.payload;
    },


   
    resetForm: () => initialState,
  },
});

export const {
  setGirlDetails,
  setFatherDetails,
  setAddreddDetails,
  setDocumentDetails,
  resetForm,
} = UserFormSlice.actions;

export default UserFormSlice.reducer;
