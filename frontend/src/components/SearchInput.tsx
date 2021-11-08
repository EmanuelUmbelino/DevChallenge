import { InputAdornment, TextField } from "@material-ui/core";
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
            <TextField sx={{ my: 2 }} fullWidth label="Search" size="small" variant="outlined"
                value={search} onChange={this.handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
        );
    }
}

export default SearchInput;
