import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import * as React from "react";

type Prop = {
    search: string;
    onSearchChange: (search: string) => void;
}
class SearchInput extends React.Component<Prop> {
    constructor(props: Prop) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {
        this.props.onSearchChange(e.target.value);
    }

    render() {
        const search = this.props.search;
        return (
            <FormControl fullWidth size="small" variant="outlined">
                <InputLabel htmlFor="search">
                    Search
                </InputLabel>
                <OutlinedInput
                    id="search" value={search} onChange={this.handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }
}

export default SearchInput;
