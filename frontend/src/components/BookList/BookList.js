import './BookList.css'
import { useSelector } from 'react-redux';

const BookList = () => {
    const books = useSelector(state => state.books);
    const msg = books.length > 0
        ? <ul>
            {books.map((book, i) => {
                return (
                    <li key={book.id}>
                        <div className='book-info'>
                            {++i}. {book.title} by <strong>{book.author}</strong>
                        </div>
                    </li>
                )
            })}
        </ul>
        : <p>No book available</p>;

    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {msg}
        </div>
    )
}

export default BookList;