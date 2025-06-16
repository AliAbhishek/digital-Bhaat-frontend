import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  girlDetails: {},
  fatherDetails: {},
  fatherAddressDetails: {},
  documentDetails: {},
  girlAddressDetails:{}

};

const UserFormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setGirlDetails: (state, action) => {
      console.log(action.payload, "action")
      state.girlDetails = action.payload;
    },
    setFatherDetails: (state, action) => {
      state.fatherDetails = action.payload;
    },

    setFatherAddreddDetails: (state, action) => {
      state.fatherAddressDetails = action.payload;
    },
    setGirlAddreddDetails: (state, action) => {
      state.girlAddressDetails = action.payload;
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
  setFatherAddreddDetails,
  setGirlAddreddDetails,
  setDocumentDetails,
  resetForm,
} = UserFormSlice.actions;

export default UserFormSlice.reducer;
