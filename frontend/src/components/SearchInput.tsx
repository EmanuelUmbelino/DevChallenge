import { FormControl, Input, InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import * as React from "react";

class SearchInput extends React.Component {
    render() {
        return (
            <FormControl fullWidth size="small" variant="outlined">
                <InputLabel htmlFor="search">
                    Search
                </InputLabel>
                <OutlinedInput
                    id="search"
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
