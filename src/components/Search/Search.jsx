
import useDebounce from '../../hooks/useDebounce'
import './Search.css'

const Search = ({ updateSearchTerm }) => {
  const debouncedCallBack = useDebounce((e) => updateSearchTerm(e.target.value), 500)

  return (
    <div className='search-wrapper'>
      <input id="pokemon-name-search"
        type="text"
        placeholder="Pokemon Name"
        onChange={debouncedCallBack} />

    </div>
  )
}

export default Search
