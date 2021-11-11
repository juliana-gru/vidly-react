const SearchBar = ({ onSearch, value }) => {
  
  return ( 
    <div className="form-group">
      <input type="search" name="query" placeholder="Search..." onChange={(e) => onSearch(e.currentTarget.value)} value={value} className="form-control my-3" />
    </div>
  );
}

export default SearchBar;