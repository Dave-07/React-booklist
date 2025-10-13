import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithID from '../../utils/createBookWithID';
import books from '../../data/books.json';


const initialState = [];

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
    }
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
    try {
        const resp = await axios.get('http://localhost:4000/random-book');
        const apiBook = resp.data;
        const expectedProps = Object.keys(books[0]);
        const hasAll = expectedProps.every(prop => Object.hasOwn(apiBook, prop));
        if (!hasAll) {
            console.warn('API fetched book missing some properties: ', apiBook);
            return;
        }

        dispatch(addBook(createBookWithID(apiBook, 'API')));

    } catch (err) {
        console.error('Failed to fetch random book:', err)
    }
}

export const selectBooks = state => state.books;

export default booksSlice.reducer;




