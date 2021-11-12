import { Box } from "@material-ui/system";
import * as React from "react";
import { Movie } from "../api/library";
import { searchMovie } from "../api/omdb";
import MovieList from "./MovieList";
import SearchInput from "./SearchInput";

type Prop = {
    addToLibrary: (movie: Movie) => void;
    removeFromLibrary: (imdb: string) => void;
    library: Map<string, Movie>;
}
type State = {
    search: string;
    movieList: { movie: Movie, inLib: boolean }[];
}
class SearchScreen extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.state = {
            search: '', movieList: []
        };

        this.searchChange = this.searchChange.bind(this);
    }

    componentDidMount() {
    }

    async searchChange(search: string) {
        this.setState({ search });
        const movies = await searchMovie(search);
        const movieList = movies.map(movie => { return { movie, inLib: this.props.library.has(movie.imdbID) } });
        this.setState({ movieList });
    }

    render() {
        const search = this.state.search;
        const movieList = this.state.movieList;
        const addToLibrary = this.props.addToLibrary;
        const removeFromLibrary = this.props.removeFromLibrary;
        return (
            <Box>
                <SearchInput
                    search={search} onSearchChange={this.searchChange} />
                <MovieList movieList={movieList} addToLibrary={addToLibrary} removeFromLibrary={removeFromLibrary} />
            </Box>
        );
    }
}

export default SearchScreen;
