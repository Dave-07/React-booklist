import './BookList.css'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import { selectTitleFilter, selectAuthorFilter, selectOnlyFavoriteFilter } from '../../redux/slices/filterSlice';

const BookList = () => {
    const books = useSelector(state => state.books);
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
    const dispatch = useDispatch();

    const handleDeleteBook = id => {
        dispatch(deleteBook(id));
    }
    const handleToggleFavorite = id => {
        dispatch(toggleFavorite(id));
    }

    const filteredBooks = books.filter(({ title, author, isFavorite }) => {
        const titleMatch = titleFilter ? title.toLowerCase().includes(titleFilter.toLowerCase()) : true;
        const authorMatch = authorFilter ? author.toLowerCase().includes(authorFilter.toLowerCase()) : true;
        const favoriteMatch = onlyFavoriteFilter ? isFavorite : true;
        return titleMatch && authorMatch && favoriteMatch;
    });


    const msg = books.length > 0
        ? <ul>
            {filteredBooks.map((book, i) => {
                return (
                    <li key={book.id}>
                        <div className='book-info'>
                            {++i}. {book.title} by <strong>{book.author}</strong>
                        </div>
                        <div className='book-action'>
                            <span onClick={() => handleToggleFavorite(book.id)}>
                                {book.isFavorite
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