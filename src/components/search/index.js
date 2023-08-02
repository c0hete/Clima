import React, { useState } from 'react';

function Search({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search); // Llama a la función pasada desde el componente padre
  };

  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
