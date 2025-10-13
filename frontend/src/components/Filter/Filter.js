import { useDispatch, useSelector } from 'react-redux';
import { 
    setTitleFilter, 
    setAuthorFilter, 
    setOnlyFavoriteFilter, 
    selectTitleFilter, 
    selectAuthorFilter,
    selectOnlyFavoriteFilter,
    resetFilter } from '../../redux/slices/filterSlice';
import './Filter.css'; 

const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

    const handleTitleFilterChange = e => {
        dispatch(setTitleFilter(e.target.value))
    }

    const handleAuthorFilterChange = e => {
        dispatch(setAuthorFilter(e.target.value))
    }

    const handleOnlyFavoriteFilterChange = () => {
        dispatch(setOnlyFavoriteFilter())
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
                <div className='filter-group'>
                    <label>
                        <input 
                        type="checkbox" 
                        checked={onlyFavoriteFilter}
                        onChange={handleOnlyFavoriteFilterChange}
                        />
                        Only Favorite
                    </label>
                </div>
                <button type='button' onClick={handleResetFilter}>Reset filter</button>
            </div>
        </div>
    )
}

export default Filter;