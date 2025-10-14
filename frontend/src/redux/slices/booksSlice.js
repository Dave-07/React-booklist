import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithID';
import books from '../../data/books.json';
import { setError } from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk('books/fetchBook', async (url, thunkAPI) => {
    try {
        const resp = await axios.get(url);
        return resp.data;
    } catch (error) {
        thunkAPI.dispatch(setError(error.message));
        throw error;
    }
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload);
        },
        deleteBook: (state, action) => {
            return state.filter(book => book.id !== action.payload);
        },
        toggleFavorite: (state, action) => {
            const book = state.find(b => b.id === action.payload);
            if (book) book.isFavorite = !book.isFavorite;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {

            const apiBook = action.payload;
            const expectedProps = Object.keys(books[0]);
            const hasAll = expectedProps.every(prop => Object.hasOwn(apiBook, prop));
            if (!hasAll) {
                console.warn('API fetched book missing some properties: ', apiBook);
                return;
            }

            state.push(createBookWithID(apiBook, 'API'));
        });
    }
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = state => state.books;

export default booksSlice.reducer;




