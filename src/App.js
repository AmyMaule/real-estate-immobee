import React, { useState } from "react";

import SearchForm from "./components/SearchForm";

function App() {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  
  return (
    <div className="page-container">
      <h1 className="page-title">Property for sale</h1>
      <SearchForm
        setSearchQuery={setSearchQuery}
        setShowSearchResults={setShowSearchResults}
      />
    </div>
  );
}

export default App;
