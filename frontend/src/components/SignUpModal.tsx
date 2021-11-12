import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@material-ui/core";
import * as React from "react";

type Prop = {
    open: boolean;
    onClose: (isActive: boolean) => void;
    signUp: (email: string, name: string, password: string, passwordConfirmation: string) => void;
}
type State = {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
}
class SignUpModal extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            passwordConfirmation: '',
        }
        this.handleClose = this.handleClose.bind(this);
        this.signUp = this.signUp.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    handleClose() {
        this.props.onClose(false);
    }

    setEmail(email: string) { this.setState({ email }); }
    setName(name: string) { this.setState({ name }); }
    setPassword(password: string) { this.setState({ password }); }
    setPasswordConfirmation(passwordConfirmation: string) { this.setState({ passwordConfirmation }); }

    signUp() { this.props.signUp(this.state.email, this.state.name, this.state.password, this.state.passwordConfirmation); }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>SignUp</DialogTitle>
                <DialogContent >
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField fullWidth size="small" label="Email" variant="outlined" onChange={e => this.setEmail(e.target.value)} />
                        <TextField fullWidth size="small" label="Name" variant="outlined" onChange={e => this.setName(e.target.value)} />
                        <TextField fullWidth size="small" label="Password" variant="outlined" type="password" onChange={e => this.setPassword(e.target.value)} />
                        <TextField fullWidth size="small" label="Confirm Password" variant="outlined" type="password" onChange={e => this.setPasswordConfirmation(e.target.value)} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.signUp}>
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SignUpModal;
