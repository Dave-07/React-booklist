import { useDispatch, useSelector } from 'react-redux';
import { setTitleFilter, setAuthorFilter, selectTitleFilter, selectAuthorFilter, resetFilter } from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);

    const handleTitleFilterChange = e => {
        dispatch(setTitleFilter(e.target.value))
    }
    const handleAuthorFilterChange = e => {
        dispatch(setAuthorFilter(e.target.value))
    }

    const handleResetFilter = () => {
        dispatch(resetFilter())
    }

    return (
        <div className="app-block filter">
            <div className='filter-row'>
                <div className='filter-group'>
                    <input
                        onChange={handleTitleFilterChange}
                        type="text"
                        value={titleFilter}
                        placeholder="Filter by title..."
                    />
                    <input
                        onChange={handleAuthorFilterChange}
                        type="text"
                        value={authorFilter}
                        placeholder="Filter by author..."
                    />
                </div>
                <button type='button' onClick={handleResetFilter}>Reset filter</button>
            </div>
        </div>
    )
}

export default Filter;