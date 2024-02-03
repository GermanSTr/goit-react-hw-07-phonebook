import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeContact, requestsContacts, addContact } from 'services/api';

export const apiGetContact = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const contacts = await requestsContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const contact = await addContact(contactData);
      return contact;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRemoveContact = createAsyncThunk(
  'contacts/deleteContact',
  async (profileId, thunkApi) => {
    try {
      const contact = await removeContact(profileId);
      return contact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(apiGetContact.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(apiGetContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ADD CONTACT
      .addCase(apiAddContact.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(apiAddContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /// REMOVE CONTACT
      .addCase(apiRemoveContact.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiRemoveContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(apiRemoveContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const contactsReducer = contactsSlice.reducer;
