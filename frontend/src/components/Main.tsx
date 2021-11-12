import * as React from "react";
import { Alert, Button, IconButton, Snackbar, Toolbar, Typography } from "@material-ui/core";
import { TabPanel } from "./TabPanel";
import SearchScreen from "./SearchScreen";
import { CollectionsBookmark, Search } from "@material-ui/icons";
import LoginModal from "./LoginModal";
import { Box } from "@material-ui/system";
import { Login } from "../api/auth";
import { AddToLibrary, GetUserLibrary, Movie, RemoveFromLibrary } from "../api/library";
import { getUserId, isAuthenticated, setToken } from "../api/token";
import MovieList from "./MovieList";

type Prop = {
}
type State = {
    currPage: number;
    modal: boolean;
    message: {
        text?: string;
        type?: 'error' | 'warning' | 'info' | 'success';
        enabled: boolean;
    };
    libraryMap: Map<string, Movie>;
    userId: string | null;
}
class Main extends React.Component<Prop, State> {

    constructor(props: Prop) {
        super(props);
        this.state = {
            currPage: 0,
            modal: false,
            message: {
                text: '',
                type: 'info',
                enabled: false
            },
            libraryMap: new Map(),
            userId: getUserId(),
        };

        this.getUserLibrary();

        this.getUserLibrary = this.getUserLibrary.bind(this);
        this.login = this.login.bind(this);
        this.addToLibrary = this.addToLibrary.bind(this);
        this.removeFromLibrary = this.removeFromLibrary.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeModalState = this.changeModalState.bind(this);
    }

    async getUserLibrary() {
        if (isAuthenticated() && this.state.userId) {
            const res = await GetUserLibrary(this.state.userId);
            if (res.data.library !== undefined) {
                const libraryMap: Map<string, Movie> = new Map();
                res.data.library.forEach((el: { movie: Movie }) => {
                    libraryMap.set(el.movie.imdbID, el.movie);
                });
                this.setState({ libraryMap });

            }
        }
    }

    async login(email: string, password: string) {
        const res = await Login({ email, password });
        if (res.data.data !== undefined) {
            setToken(res.data.data.token, res.data.data.userId);
            this.setState({ modal: false });
        } else {
            this.showMessage(res.data.message[0], 'error');
        }
    }

    async addToLibrary(movie: Movie) {
        const res = await AddToLibrary(movie);
        if (res.data.review !== undefined) {
            const movie = res.data.review.movie;
            this.state.libraryMap.set(movie.imdbID, movie);
            this.setState({ libraryMap: this.state.libraryMap });
        }
    }

    async removeFromLibrary(imdb: string) {
        const res = await RemoveFromLibrary(imdb);
        if (res.data !== undefined) {
            this.state.libraryMap.delete(imdb);
            this.setState({ libraryMap: this.state.libraryMap });
        }
    }

    showMessage(text?: string, type?: 'error' | 'warning' | 'info' | 'success') { this.setState({ message: { text, type, enabled: true } }); }
    handleCloseMessage() { this.setState({ message: { enabled: false } }); }

    changePage(currPage: number) { this.setState({ currPage }); }
    changeModalState(isActive: boolean) { this.setState({ modal: isActive }); }

    isActive(page: number) {
        return this.state.currPage === page ? 'primary' : 'default';
    }

    render() {
        const currPage = this.state.currPage;
        const modal = this.state.modal;
        const message = this.state.message;
        const libraryMap = this.state.libraryMap;
        const library = Array.from(libraryMap, ([imdb, movie]) => ({ movie, inLib: true }));
        return (
            <Box sx={{ m: 2 }}>
                <Toolbar>
                    <Typography variant="h4" sx={{ mr: 4 }}>
                        Moovy
                    </Typography>
                    <IconButton size="large" onClick={() => this.changePage(0)} color={this.isActive(0)} >
                        <Search />
                        <Typography variant="button" sx={{ mx: 1 }}>
                            Search
                        </Typography>
                    </IconButton>
                    <IconButton size="large" onClick={() => this.changePage(1)} color={this.isActive(1)} >
                        <CollectionsBookmark />
                        <Typography variant="button" sx={{ mx: 1 }}>
                            My Library
                        </Typography>
                    </IconButton>
                </Toolbar>
                <TabPanel value={currPage} index={0}>
                    <SearchScreen addToLibrary={this.addToLibrary} removeFromLibrary={this.removeFromLibrary} library={libraryMap} />
                </TabPanel>
                <TabPanel value={currPage} index={1}>
                    <Button onClick={() => this.changeModalState(true)}>
                        Login
                    </Button>
                    <MovieList movieList={library} addToLibrary={this.addToLibrary} removeFromLibrary={this.removeFromLibrary} />
                </TabPanel>
                <LoginModal open={modal} onClose={this.changeModalState} login={this.login} />
                <Snackbar autoHideDuration={6000} onClose={this.handleCloseMessage} open={message.enabled} message={message.text}>
                    <Alert onClose={this.handleCloseMessage} severity={message.type} sx={{ width: '100%' }}>
                        {message.text}
                    </Alert>
                </Snackbar>
            </Box >
        );
    }
}

export default Main;
