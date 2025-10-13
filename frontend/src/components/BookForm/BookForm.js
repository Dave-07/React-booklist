import { useState } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addBook } from '../../redux/slices/booksSlice';
import './BookForm.css';
import books from '../../data/books.json';
import createBookWithID from '../../utils/createBookWithID';


const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();

    const handleAddRandomBook = () => {
        const len = books.length;
        const randNum = Math.floor(Math.random() * len) + 1;
        const randBook = books[randNum];
        dispatch(addBook(createBookWithID(randBook)));
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (title && author) {
            dispatch(addBook(createBookWithID({ title, author })));
            setTitle('');
            setAuthor('');
        }
    }

    const handleAddRandomBookViaAPI = async () => {
        try {
            const resp = await axios.get('http://localhost:4000/random-book');
            const apiBook = resp.data;
            const expectedProps = Object.keys(books[0]);
            const hasAll = expectedProps.every(prop => Object.hasOwn(apiBook, prop));
            if (!hasAll) {
                console.warn('API fetched book missing some properties: ', apiBook);
                return;
            }

            dispatch(addBook(createBookWithID(apiBook)));

        } catch (err) {
            console.error('Failed to fetch random book:', err)
        }
    }

    return (
        <div className="app-block book-form">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)} />
                </div>
                <button type="submit">Add Book</button>
                <button type="button" onClick={handleAddRandomBook}>Add Random</button>
                <button type="button" onClick={handleAddRandomBookViaAPI}>Add Random via API</button>
            </form>
        </div>
    )
}

export default BookForm;