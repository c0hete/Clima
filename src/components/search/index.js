import React, { useState } from 'react';
import './index.css';

function Search({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="search-container">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;

