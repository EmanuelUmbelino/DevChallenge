import * as React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { LibraryAdd } from "@material-ui/icons";
import { Movie } from "../api/library";

type Prop = {
    movie: Movie;
    inLib: boolean;
    addToLibrary: (movie: Movie) => void;
    removeFromLibrary: (imdb: string) => void;
}
class MovieCard extends React.Component<Prop> {
    render() {
        const movie = this.props.movie;
        const inLib = this.props.inLib;
        const addToLibrary = this.props.addToLibrary;
        const removeFromLibrary = this.props.removeFromLibrary;
        return (
            <Card sx={{ maxWidth: 200 }}>
                <CardMedia component="img" image={movie.poster} />
                <CardContent>
                    <Typography variant="subtitle2" component="div">
                        {movie.title}
                    </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0 }}>
                    {inLib ?
                        <Button fullWidth size="small" variant="outlined" color="error" startIcon={<LibraryAdd />} onClick={() => removeFromLibrary(movie.imdbID)}>
                            Remove from My Library
                        </Button> :
                        <Button fullWidth size="small" variant="outlined" startIcon={<LibraryAdd />} onClick={() => addToLibrary(movie)}>
                            Add to My Library
                        </Button>
                    }

                </CardActions>
            </Card>
        );
    }
}

export default MovieCard;
