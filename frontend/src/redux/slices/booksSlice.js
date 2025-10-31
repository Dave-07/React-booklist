import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithID';
import {API_BASE} from '../../utils/API_base';
import books from '../../data/books.json';
import { setError } from './errorSlice';

const initialState = {
    books: [],
    isLoadingViaAPI: false
};

export const fetchBook = createAsyncThunk('books/fetchBook', async (_, thunkAPI) => {
    try {
        const resp = await axios.get(`${API_BASE}/random-book-delayed`);
        return resp.data;
    } catch (error) {
        thunkAPI.dispatch(setError(error.message));
        return thunkAPI.rejectWithValue(error);
    }
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        deleteBook: (state, action) => {
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            }
        },
        toggleFavorite: (state, action) => {
            const book = state.books.find(b => b.id === action.payload);
            if (book) book.isFavorite = !book.isFavorite;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.isLoadingViaAPI = true;
            })

            .addCase(fetchBook.fulfilled, (state, action) => {
                const apiBook = action.payload;
                const expectedProps = Object.keys(books[0]);
                const hasAll = expectedProps.every(prop => Object.hasOwn(apiBook, prop));
                state.isLoadingViaAPI = false;

                if (!hasAll) {
                    console.warn('API fetched book missing some properties: ', apiBook);
                    return;
                }

                state.books.push(createBookWithID(apiBook, 'API'));
            })

            .addCase(fetchBook.rejected, (state) => {
                state.isLoadingViaAPI = false;
            })


    }
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = state => state.books.books;
export const selectIsLoadingViaAPI = state => state.books.isLoadingViaAPI;

export default booksSlice.reducer;




