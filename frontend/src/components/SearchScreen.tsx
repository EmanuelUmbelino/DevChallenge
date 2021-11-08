import { Container } from "@material-ui/core";
import * as React from "react";
import { searchMovie } from "../api/omdb";
import { Movie } from "./MovieCard";
import MovieList from "./MovieList";
import SearchInput from "./SearchInput";

type Prop = {
}
type State = {
    search: string;
    movieList: Movie[];
}
class SearchScreen extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.searchChange = this.searchChange.bind(this);
        this.state = {
            search: '', movieList: [

                {
                    Title: "Beyond the Mat",
                    Year: "1999",
                    imdbID: "tt0218043",
                    Type: "movie",
                    Poster: "https://m.media-amazon.com/images/M/MV5BMTQ5NDUzODkyOF5BMl5BanBnXkFtZTcwNjY3OTIyMQ@@._V1_SX300.jpg"
                }
            ]
        };
    }

    componentDidMount() {
    }

    searchChange(search: string) {
        this.setState({ search });
        searchMovie(search).then((movieList) => {
            this.setState({ movieList: movieList });
        });
    }

    render() {
        const search = this.state.search;
        const movieList = this.state.movieList;
        return (
            <Container sx={{ my: 2 }}>
                <SearchInput
                    search={search} onSearchChange={this.searchChange} />
                <MovieList movieList={movieList} />
            </Container>
        );
    }
}

export default SearchScreen;
