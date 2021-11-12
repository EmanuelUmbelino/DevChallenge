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
class MovieCard extends React.Component<Prop, { inLib: boolean }> {
    constructor(props: Prop) {
        super(props);
        this.state = {
            inLib: this.props.inLib,
        };
        this.addToLibrary = this.addToLibrary.bind(this);
        this.removeFromLibrary = this.removeFromLibrary.bind(this);
    }

    async addToLibrary() {
        this.props.addToLibrary(this.props.movie);
        this.setState({ inLib: true });
    }

    async removeFromLibrary() {
        this.props.removeFromLibrary(this.props.movie.imdbID);
        this.setState({ inLib: false });
    }

    render() {
        const movie = this.props.movie;
        let inLib = this.state.inLib;
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
                        <Button fullWidth size="small" variant="outlined" color="error" startIcon={<LibraryAdd />} onClick={this.removeFromLibrary}>
                            Remove from My Library
                        </Button> :
                        <Button fullWidth size="small" variant="outlined" startIcon={<LibraryAdd />} onClick={this.addToLibrary}>
                            Add to My Library
                        </Button>
                    }

                </CardActions>
            </Card>
        );
    }
}

export default MovieCard;
