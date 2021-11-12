import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@material-ui/core";
import * as React from "react";

type Prop = {
    open: boolean;
    onClose: (isActive: boolean) => void;
    login: (email: string, password: string) => void;
}
type State = {
    email: string;
    password: string;
}
class LoginModal extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleClose = this.handleClose.bind(this);
        this.login = this.login.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    handleClose() {
        this.props.onClose(false);
    }

    setEmail(email: string) { this.setState({ email }); }
    setPassword(password: string) { this.setState({ password }); }

    login() { this.props.login(this.state.email, this.state.password); }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent >
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField fullWidth size="small" label="Email" variant="outlined" onChange={e => this.setEmail(e.target.value)} />
                        <TextField fullWidth size="small" label="Password" variant="outlined" type="password" onChange={e => this.setPassword(e.target.value)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.login}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default LoginModal;
