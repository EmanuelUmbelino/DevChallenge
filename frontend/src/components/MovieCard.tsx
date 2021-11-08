import * as React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { LibraryAdd } from "@material-ui/icons";

export type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
};

type Prop = {
    movie: Movie;
}
class MovieCard extends React.Component<Prop> {
    render() {
        const movie = this.props.movie;
        return (
            <Card sx={{ maxWidth: 200 }}>
                <CardMedia component="img" image={movie.Poster} />
                <CardContent>
                    <Typography variant="subtitle2" component="div">
                        {movie.Title}
                    </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0 }}>
                    <Button fullWidth size="small" variant="outlined" startIcon={<LibraryAdd />}>
                        Add to My Library
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default MovieCard;
