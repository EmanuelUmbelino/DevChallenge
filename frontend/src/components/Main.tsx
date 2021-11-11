import * as React from "react";
import { Container, IconButton, Toolbar, Typography } from "@material-ui/core";
import { TabPanel } from "./TabPanel";
import SearchScreen from "./SearchScreen";
import { CollectionsBookmark, Search } from "@material-ui/icons";

type Prop = {
}
type State = {
    currPage: number;
}
class Main extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.state = {
            currPage: 0
        };
    }

    componentDidMount() {
    }

    changePage(currPage: number) {
        this.setState({ currPage });
    }

    isActive(page: number) {
        return this.state.currPage === page ? 'primary' : 'default';
    }

    render() {
        const currPage = this.state.currPage;
        return (
            <Container sx={{ my: 2 }}>
                <Toolbar>
                    <Typography variant="h4" sx={{ mr: 5 }}>
                        Moovy
                    </Typography>
                    <IconButton size="large" aria-label="search" onClick={() => this.changePage(0)} aria-haspopup="true" color={this.isActive(0)} >
                        <Search />
                        <Typography variant="button" sx={{ mx: 1 }}>
                            Search
                        </Typography>
                    </IconButton>
                    <IconButton size="large" aria-label="library" onClick={() => this.changePage(1)} aria-haspopup="true" color={this.isActive(1)} >
                        <CollectionsBookmark />
                        <Typography variant="button" sx={{ mx: 1 }}>
                            My Library
                        </Typography>
                    </IconButton>
                </Toolbar>
                <TabPanel value={currPage} index={0}>
                    <SearchScreen />
                </TabPanel>
                <TabPanel value={currPage} index={1}>
                    Item Two
                </TabPanel>
            </Container>
        );
    }
}

export default Main;
