import './BookList.css'
import {BsBookmarkStarFill, BsBookmarkStar} from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';


const BookList = () => {
    const books = useSelector(state => state.books);
    const dispatch = useDispatch();

    const handleDeleteBook = id => {
        dispatch(deleteBook(id));
    }
    const handleToggleFavorite = id => {
        dispatch(toggleFavorite(id));
    }

    const msg = books.length > 0
        ? <ul>
            { books.map((book, i) => {
                return (
                    <li key={book.id}>
                        <div className='book-info'>
                            {++i}. {book.title} by <strong>{book.author}</strong>
                        </div>
                        <div className='book-action'>
                            <span onClick={() => handleToggleFavorite(book.id)}>
                                { book.isFavorite
                                    ? (
                                        <BsBookmarkStarFill className="star-icon" />
                                    ) : (
                                        <BsBookmarkStar className="star-icon" />
                                    )
                                }
                            </span>
                            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
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