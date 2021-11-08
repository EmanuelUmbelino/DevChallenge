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
        this.state = { search: '', movieList: [] };
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
            <Container>
                <SearchInput
                    search={search} onSearchChange={this.searchChange} />
                <MovieList movieList={movieList} />
            </Container>
        );
    }
}

export default SearchScreen;
