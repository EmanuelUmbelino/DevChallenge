import * as React from "react";
import { Box } from "@material-ui/system";
import { Button, Container, Tab, Tabs } from "@material-ui/core";
import { a11yProps, TabPanel } from "./TabPanel";
import SearchScreen from "./SearchScreen";

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
        return this.state.currPage === page ? 'contained' : 'outlined'
    }

    render() {
        const currPage = this.state.currPage;
        return (
            <Container sx={{ my: 2 }}>
                <Button sx={{ mx: 3 }} variant={this.isActive(0)} onClick={() => this.changePage(0)}>Search</Button>
                <Button sx={{ mx: 1 }} variant={this.isActive(1)} onClick={() => this.changePage(1)}>My Library</Button>
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
