import { Grid } from "@material-ui/core";
import * as React from "react";
import { Movie } from "../api/library";
import MovieCard from "./MovieCard";

type Prop = {
    movieList: { movie: Movie, inLib: boolean }[];
    addToLibrary: (movie: Movie) => void;
    removeFromLibrary: (imdb: string) => void;
}
class MovieList extends React.Component<Prop> {
    render() {
        const addToLibrary = this.props.addToLibrary;
        const removeFromLibrary = this.props.removeFromLibrary;
        const list = this.props.movieList.map((m) =>
            <Grid item key={m.movie.imdbID}>
                <MovieCard movie={m.movie} inLib={m.inLib} addToLibrary={addToLibrary} removeFromLibrary={removeFromLibrary} />
            </Grid>
        );
        return (
            <Grid container spacing={2}>
                {list}
            </Grid>
        );
    }
}

export default MovieList;
