import * as React from "react";
import * as ReactDOM from "react-dom";
import './App.css';

import { response } from "./api/mocked";
import MovieList from "./components/MovieList";
import SearchInput from "./components/SearchInput";
import { Container, createTheme, TextField } from "@material-ui/core";
import { ThemeProvider } from "@emotion/react";

const movieList = response.Search;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Container>
          <SearchInput />
          {/* <TextField fullWidth size="small" label="Search" id="search" /> */}
          <MovieList movieList={movieList} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
