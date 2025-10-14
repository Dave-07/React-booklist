import { useState } from "react";
import { useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import './BookForm.css';
import books from '../../data/books.json';
import createBookWithID from '../../utils/createBookWithID';
import { setError } from "../../redux/slices/errorSlice";


const BookForm = () => { 
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
 
    const handleAddRandomBook = () => { 
        const len = books.length;
        const randNum = Math.floor(Math.random() * len) + 1;
        const randBook = books[randNum];
        dispatch(addBook(createBookWithID(randBook, 'random')));
    }
 
    const handleSubmit = e => {
        e.preventDefault();

        if (title && author) {
            dispatch(addBook(createBookWithID({ title, author }, 'manual')));
            setTitle('');
            setAuthor('');
        }else {
            dispatch(setError('You must fill title and author'));
        }
    }

    const handleAddRandomBookViaAPI = async () => {
        try {
            setIsLoading(true);
            await dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
        } finally {
            setIsLoading(false);
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
                <button type="button" onClick={handleAddRandomBookViaAPI} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span>Loading Book...</span>
                            <FaSpinner className="spinner" />
                        </>
                    ) : "Add Random via API"}

                </button>
            </form>
        </div>
    )
}

export default BookForm;