import { Grid } from "@material-ui/core";
import * as React from "react";
import MovieCard, { Movie } from "./MovieCard";

class MovieList extends React.Component<{ movieList: Movie[] }> {
    render() {
        const list = this.props.movieList.map((movie) =>

            <Grid item>
                <MovieCard key={movie.imdbID} movie={movie} />
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
