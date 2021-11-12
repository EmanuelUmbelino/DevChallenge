import * as React from "react";
import { Alert, Button, IconButton, Snackbar, Toolbar, Typography } from "@material-ui/core";
import { TabPanel } from "./TabPanel";
import SearchScreen from "./SearchScreen";
import { CollectionsBookmark, Search } from "@material-ui/icons";
import LoginModal from "./LoginModal";
import { Box } from "@material-ui/system";
import { Login, SignUp } from "../api/auth";
import { AddToLibrary, GetUserLibrary, Movie, RemoveFromLibrary } from "../api/library";
import { getUserId, isAuthenticated, removeToken, setToken } from "../api/token";
import MovieList from "./MovieList";
import SignUpModal from "./SignUpModal";

type Prop = {
}
type State = {
    currPage: number;
    modal: 'login' | 'signup' | null;
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
            modal: null,
            message: {
                text: '',
                type: 'info',
                enabled: false
            },
            libraryMap: new Map(),
            userId: getUserId(),
        };

        this.getUserLibrary = this.getUserLibrary.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.login = this.login.bind(this);
        this.addToLibrary = this.addToLibrary.bind(this);
        this.removeFromLibrary = this.removeFromLibrary.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeModalState = this.changeModalState.bind(this);
    }

    componentDidMount() {
        if (isAuthenticated() && this.state.userId) {
            this.getUserLibrary(this.state.userId);
        }
    }

    async getUserLibrary(userId: string) {
        const res = await GetUserLibrary(userId);
        if (res.data.library !== undefined) {
            const libraryMap: Map<string, Movie> = new Map();
            res.data.library.forEach((el: { movie: Movie }) => {
                libraryMap.set(el.movie.imdbID, el.movie);
            });
            this.setState({ libraryMap });

        }
    }

    saveUser(token: string, userId: string) {
        setToken(token, userId);
        this.setState({ modal: null, userId });
        this.getUserLibrary(userId);
    }

    async login(email: string, password: string) {
        const res = await Login({ email, password });
        if (res.data.data !== undefined) {
            this.saveUser(res.data.data.token, res.data.data.userId);
        } else {
            this.showMessage(res.data.message[0], 'error');
        }
    }

    async signUp(email: string, name: string, password: string, passwordConfirmation: string) {
        const res = await SignUp({ email, name, password, passwordConfirmation });
        if (res.data.data !== undefined) {
            this.saveUser(res.data.data.token, res.data.data.userId);
        } else {
            this.showMessage(res.data.message[0], 'error');
        }
    }

    async logout() {
        removeToken();
        this.setState({ libraryMap: new Map(), userId: null });
    }

    async addToLibrary(movie: Movie) {
        if (isAuthenticated()) {
            const res = await AddToLibrary(movie);
            if (res.data.review !== undefined) {
                const movie = res.data.review.movie;
                this.state.libraryMap.set(movie.imdbID, movie);
                this.setState({ libraryMap: this.state.libraryMap });
            }
        } else {
            this.changeModalState('login');
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
    changeModalState(state: 'login' | 'signup' | null) { this.setState({ modal: state }); }

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
                    <Typography variant="h4" sx={{ mr: 4, flexGrow: 1 }}>
                        Moovy
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
                    </Typography>
                    {isAuthenticated() ?
                        <Button onClick={() => this.logout()}>
                            Logout
                        </Button> :
                        <div>
                            <Button onClick={() => this.changeModalState('login')}>
                                Login
                            </Button>
                            <Button onClick={() => this.changeModalState('signup')}>
                                Sign Up
                            </Button>
                        </div>
                    }
                </Toolbar>
                <TabPanel value={currPage} index={0}>
                    <SearchScreen addToLibrary={this.addToLibrary} removeFromLibrary={this.removeFromLibrary} library={libraryMap} />
                </TabPanel>
                <TabPanel value={currPage} index={1}>
                    <MovieList movieList={library} addToLibrary={this.addToLibrary} removeFromLibrary={this.removeFromLibrary} />
                </TabPanel>
                <LoginModal open={modal === 'login'} onClose={() => this.changeModalState(null)} login={this.login} />
                <SignUpModal open={modal === 'signup'} onClose={() => this.changeModalState(null)} signUp={this.signUp} />
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
