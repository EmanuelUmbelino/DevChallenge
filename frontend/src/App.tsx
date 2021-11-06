import * as React from "react";
import * as ReactDOM from "react-dom";
import './App.css';

import { response } from "./api/mocked";
import MovieList from "./components/MovieList";

const movieList = response.Search;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MovieList movieList={movieList} />
      </header>
    </div>
  );
}

export default App;
