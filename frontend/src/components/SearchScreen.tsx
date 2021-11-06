import { Container } from "@material-ui/core";
import * as React from "react";
import { response } from "../api/mocked";
import MovieList from "./MovieList";
import SearchInput from "./SearchInput";

const movieList = response.Search;

type Prop = {
}
type State = {
    search: string;
}
class SearchScreen extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.searchChange = this.searchChange.bind(this);
        this.state = { search: '' };
    }

    searchChange(search: string) {
        this.setState({ search });
    }

    render() {
        const search = this.state.search;
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
