import * as React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";

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
                    <Typography gutterBottom variant="h6" component="div">
                        {movie.Title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Add to My Library</Button>
                </CardActions>
            </Card>
        );
    }
}

export default MovieCard;
